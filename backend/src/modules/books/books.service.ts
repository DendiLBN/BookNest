import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { SearchBookDto } from './dto/search-book.dto';
import { PaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schema/book.schema';
import { FilterQuery, Model } from 'mongoose';
import { categories } from 'src/shared/data/categories';

const MIN_BOOKS_NUMBER = 100;
const BOOK_COVER_WIDTH = 120;
const BOOK_COVER_HEIGHT = 180;

@Injectable()
export class BooksService implements OnModuleInit {
  constructor(@InjectModel(Book.name) private readonly bookModel: Model<BookDocument>) {}

  async onModuleInit() {
    const booksCount = await this.bookModel.countDocuments();

    await this.addMissingCoverImages();

    if (booksCount < MIN_BOOKS_NUMBER) {
      for (let i = 0; i < MIN_BOOKS_NUMBER - booksCount; i++) {
        let category1: string, category2: string;
        do {
          category1 = categories[Math.floor(Math.random() * categories.length)];
          category2 = categories[Math.floor(Math.random() * categories.length)];
        } while (category1 === category2);

        const bookIndex = i + booksCount;
        const title = `Book ${bookIndex}`;

        const createdBook = await this.create({
          title,
          author: `Author ${bookIndex}`,
          rate: Math.floor(Math.random() * 5) + 1,
          category: [category1, category2],
          coverImageUrl: this.getSeededCoverImageUrl(title),
        });
        console.log(createdBook);
      }
    }
  }

  async create(createBookDto: Partial<Book>): Promise<BookDocument> {
    const newBook = await this.bookModel.create(createBookDto);
    return newBook;
  }

  async findAll(searchBookDto: SearchBookDto): Promise<PaginatedResponse<Book>> {
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
      throw new NotFoundException(`Book with ids not deleted ${resultDeleted.deletedCount}.`);
    }

    return { deletedCount: resultDeleted.deletedCount };
  }

  private buildSearchQuery(searchBookDto: SearchBookDto) {
    const query: FilterQuery<Book> = {};

    if (searchBookDto.searchString) {
      query.$or = [
        { title: { $regex: searchBookDto.searchString, $options: 'i' } },
        { author: { $regex: searchBookDto.searchString, $options: 'i' } },
      ];
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
      $or: [{ coverImageUrl: { $exists: false } }, { coverImageUrl: '' }, { coverImageUrl: null }],
    });

    await Promise.all(
      booksWithoutCover.map((book) =>
        this.bookModel.findByIdAndUpdate(book._id, {
          coverImageUrl: this.getSeededCoverImageUrl(book.title),
        }),
      ),
    );
  }

  private getSeededCoverImageUrl(title: string) {
    return `https://picsum.photos/seed/${encodeURIComponent(
      title,
    )}/${BOOK_COVER_WIDTH}/${BOOK_COVER_HEIGHT}`;
  }
}
