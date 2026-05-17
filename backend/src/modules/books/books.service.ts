import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { SearchBookDto } from './dto/search-book.dto';
import { seedBooks } from './data/seed-books';
import { PaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schema/book.schema';
import { FilterQuery, Model } from 'mongoose';
import { categories } from 'src/shared/data/categories';
import { BookDashboardSummary } from './interfaces/book-dashboard-summary.interface';
import { publicDomainBookCovers } from './data/public-domain-book-covers';

const MIN_BOOKS_NUMBER = 100;
const BOOK_COVER_WIDTH = 480;
const BOOK_COVER_HEIGHT = 720;

@Injectable()
export class BooksService implements OnModuleInit {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  async onModuleInit() {
    const booksCount = await this.bookModel.countDocuments();

    await this.replaceGeneratedBookNames();
    await this.addMissingCoverImages();
    await this.addMissingPrices();
    await this.upgradeSeededCoverImages();
    await this.applyPublicDomainCoverImages();

    if (booksCount < MIN_BOOKS_NUMBER) {
      for (let i = 0; i < MIN_BOOKS_NUMBER - booksCount; i++) {
        let category1: string, category2: string;
        do {
          category1 = categories[Math.floor(Math.random() * categories.length)];
          category2 = categories[Math.floor(Math.random() * categories.length)];
        } while (category1 === category2);

        const bookIndex = i + booksCount;
        const seedBook = this.getSeedBook(bookIndex);

        await this.create({
          title: seedBook.title,
          author: seedBook.author,
          rate: Math.floor(Math.random() * 5) + 1,
          category: [category1, category2],
          coverImageUrl: this.getBookCoverImageUrl(seedBook.title),
          priceCents: this.getSeedBookPriceCents(bookIndex),
        });
      }
    }
  }

  async create(createBookDto: Partial<Book>): Promise<BookDocument> {
    const newBook = await this.bookModel.create(createBookDto);
    return newBook;
  }

  async findAll(
    searchBookDto: SearchBookDto,
  ): Promise<PaginatedResponse<Book>> {
    const { page, perPage } = searchBookDto;

    const { skip, take } = this.getPaginationParams(page, perPage);
    const query = this.buildSearchQuery(searchBookDto);

    const totalItems = await this.bookModel.countDocuments(query);

    const data = await this.bookModel.find(query).skip(skip).limit(take);

    return {
      data,
      page,
      perPage,
      totalItems,
    };
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return book;
  }

  async findManyByIds(ids: string[]): Promise<BookDocument[]> {
    return this.bookModel.find({ _id: { $in: ids } }).exec();
  }

  async updateOne(id: string, updateBookDto: Partial<Book>): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return this.bookModel.findByIdAndUpdate(id, updateBookDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return this.bookModel.findByIdAndDelete(id);
  }

  async removeMultiple(ids: string[]): Promise<{ deletedCount: number }> {
    const resultDeleted = await this.bookModel.deleteMany({
      _id: { $in: ids },
    });

    if (resultDeleted.deletedCount !== ids.length) {
      throw new NotFoundException(
        `Book with ids not deleted ${resultDeleted.deletedCount}.`,
      );
    }

    return { deletedCount: resultDeleted.deletedCount };
  }

  async getDashboardSummary(): Promise<BookDashboardSummary> {
    const [summary] = await this.bookModel.aggregate<{
      totalBooks: number;
      categories: string[];
      averageRating: number;
    }>([
      {
        $group: {
          _id: null,
          totalBooks: { $sum: 1 },
          categories: { $push: '$category' },
          averageRating: { $avg: '$rate' },
        },
      },
      {
        $project: {
          _id: 0,
          totalBooks: 1,
          categories: {
            $setUnion: {
              $reduce: {
                input: '$categories',
                initialValue: [],
                in: { $concatArrays: ['$$value', '$$this'] },
              },
            },
          },
          averageRating: 1,
        },
      },
    ]);

    return {
      totalBooks: summary?.totalBooks ?? 0,
      totalCategories: summary?.categories.length ?? 0,
      averageRating: Number((summary?.averageRating ?? 0).toFixed(1)),
    };
  }

  private buildSearchQuery(searchBookDto: SearchBookDto) {
    const query: FilterQuery<Book> = {};

    if (searchBookDto.searchString) {
      query.$or = [
        { title: { $regex: searchBookDto.searchString, $options: 'i' } },
        { author: { $regex: searchBookDto.searchString, $options: 'i' } },
      ];
    }

    if (searchBookDto.category?.length) {
      query.category = { $in: searchBookDto.category };
    }

    return query;
  }

  private getPaginationParams(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    return {
      skip,
      take: perPage,
    };
  }

  private async addMissingCoverImages() {
    const booksWithoutCover = await this.bookModel.find({
      $or: [
        { coverImageUrl: { $exists: false } },
        { coverImageUrl: '' },
        { coverImageUrl: null },
      ],
    });

    await Promise.all(
      booksWithoutCover.map((book) =>
        this.bookModel.findByIdAndUpdate(book._id, {
          coverImageUrl: this.getBookCoverImageUrl(book.title),
        }),
      ),
    );
  }

  private async addMissingPrices() {
    const booksWithoutPrice = await this.bookModel.find({
      $or: [{ priceCents: { $exists: false } }, { priceCents: null }],
    });

    await Promise.all(
      booksWithoutPrice.map((book, index) =>
        this.bookModel.findByIdAndUpdate(book._id, {
          priceCents: this.getSeedBookPriceCents(index),
        }),
      ),
    );
  }

  private async upgradeSeededCoverImages() {
    const seededCoverBooks = await this.bookModel.find({
      coverImageUrl: /picsum\.photos\/seed\/.+\/120\/180$/,
    });

    await Promise.all(
      seededCoverBooks.map((book) =>
        this.bookModel.findByIdAndUpdate(book._id, {
          coverImageUrl: this.getBookCoverImageUrl(book.title),
        }),
      ),
    );
  }

  private async applyPublicDomainCoverImages() {
    const coveredBookTitles = Object.keys(publicDomainBookCovers);
    const booksWithPublicDomainCovers = await this.bookModel.find({
      title: {
        $in: coveredBookTitles.flatMap((title) => [
          title,
          new RegExp(
            `^${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} \\(\\d+\\)$`,
          ),
        ]),
      },
    });

    await Promise.all(
      booksWithPublicDomainCovers.map((book) =>
        this.bookModel.findByIdAndUpdate(book._id, {
          coverImageUrl: this.getBookCoverImageUrl(book.title),
        }),
      ),
    );
  }

  private async replaceGeneratedBookNames() {
    const generatedBooks = await this.bookModel
      .find({
        $or: [{ title: /^Book \d+$/ }, { author: /^Author \d+$/ }],
      })
      .sort({ _id: 1 });

    await Promise.all(
      generatedBooks.map((book, index) => {
        const seedBook = this.getSeedBook(index);

        return this.bookModel.findByIdAndUpdate(book._id, {
          title: seedBook.title,
          author: seedBook.author,
          coverImageUrl: this.getBookCoverImageUrl(seedBook.title),
        });
      }),
    );
  }

  private getSeedBook(index: number) {
    const seedBook = seedBooks[index % seedBooks.length];
    const duplicateNumber = Math.floor(index / seedBooks.length);

    if (duplicateNumber === 0) {
      return seedBook;
    }

    return {
      title: `${seedBook.title} (${duplicateNumber + 1})`,
      author: seedBook.author,
    };
  }

  private getSeedBookPriceCents(index: number) {
    return 2499 + (index % 8) * 500;
  }

  private getSeededCoverImageUrl(title: string) {
    return `https://picsum.photos/seed/${encodeURIComponent(
      title,
    )}/${BOOK_COVER_WIDTH}/${BOOK_COVER_HEIGHT}`;
  }

  private getBookCoverImageUrl(title: string) {
    const baseTitle = title.replace(/\s\(\d+\)$/, '');

    return (
      publicDomainBookCovers[baseTitle] ?? this.getSeededCoverImageUrl(title)
    );
  }
}
