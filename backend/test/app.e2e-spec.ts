import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, connect, Types } from 'mongoose';
import { AppModule } from '../src/modules/app.module';
import { CreateBookDto } from 'src/modules/books/dto/create-book.dto';
import { MongooseModule } from '@nestjs/mongoose';
import { BookDocument } from 'src/modules/books/schema/book.schema';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let createdBook: BookDocument;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    mongoConnection = (await connect(uri)).connection;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(uri), AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    await app.init();

    await request(app.getHttpServer())
      .post('/books')
      .send({ title: 'zzz', author: 'zzz', rate: 2 });
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
    await app.close();
  });

  /**
   * NOTE /books (POST)
   */
  it('/books (POST) - should create a new book', async () => {
    const createBookDto: CreateBookDto = {
      title: 'Test Book',
      author: 'Test Author',
      rate: 2,
      coverImageUrl: 'https://example.com/test-book-cover.jpg',
    };

    const response = await request(app.getHttpServer())
      .post('/books')
      .send(createBookDto);

    expect(response.status).toBe(201);
    expect(response.body).toBeTruthy();
    expect(response.body.coverImageUrl).toEqual(createBookDto.coverImageUrl);

    createdBook = response.body;
  });

  it('/books (POST) - shoud return validation errors', async () => {
    const createBookDto: Partial<CreateBookDto> = {
      title: 'Test Book',
    };

    const response = await request(app.getHttpServer())
      .post('/books')
      .send(createBookDto);

    expect(response.status).toBe(400);
    expect(response.body.error).toEqual('Bad Request');
    expect(Array.isArray(response.body.message)).toEqual(true);
    expect(response.body.message.length).toBeGreaterThan(0);
    expect(response.body.message).toContain('author should not be empty');
  });

  /**
   * NOTE /books (GET)
   */
  it('/books (GET) - should return list of elements on first page', async () => {
    const response = await request(app.getHttpServer())
      .get('/books')
      .query({ page: 1, perPage: 10 });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(Array.isArray(response.body.data)).toEqual(true);
    expect(response.body.data.length).toEqual(2);
    expect(response.body.page).toEqual(1);
    expect(response.body.perPage).toEqual(10);
    expect(response.body.totalItems).toEqual(2);
  });

  it('/books (GET) - should return list of elements on first page using search string', async () => {
    const response = await request(app.getHttpServer())
      .get('/books')
      .query({ page: 1, perPage: 10, searchString: 'Test' });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(Array.isArray(response.body.data)).toEqual(true);
    expect(response.body.data.length).toEqual(1);
    expect(response.body.data[0]._id).toEqual(createdBook._id);
    expect(response.body.page).toEqual(1);
    expect(response.body.perPage).toEqual(10);
    expect(response.body.totalItems).toEqual(1);
  });

  it('/books (GET) - should return empty list of elements on secong page', async () => {
    const response = await request(app.getHttpServer())
      .get('/books')
      .query({ page: 2, perPage: 10 });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(Array.isArray(response.body.data)).toEqual(true);
    expect(response.body.data.length).toEqual(0);
    expect(response.body.data[0]).toEqual(undefined);
    expect(response.body.page).toEqual(2);
    expect(response.body.perPage).toEqual(10);
    expect(response.body.totalItems).toEqual(2);
  });

  it('/books (GET) - should return validation errors', async () => {
    const response = await request(app.getHttpServer()).get('/books').query({});

    expect(response.status).toBe(400);
    expect(response.body).toBeTruthy();
    expect(response.body.error).toEqual('Bad Request');
    expect(Array.isArray(response.body.message)).toEqual(true);
    expect(response.body.message.length).toBeGreaterThan(0);
    expect(response.body.message).toContain('page must be an integer number');
  });

  /**
   * NOTE /books/:id (GET)
   */
  it('/books/:id (GET) - should return book element', async () => {
    const response = await request(app.getHttpServer()).get(
      `/books/${createdBook._id}`,
    );

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(response.body.title).toEqual('Test Book');
  });
  it('/books/:id (GET) - should return 404', async () => {
    const response = await request(app.getHttpServer()).get(
      `/books/${new Types.ObjectId()}`,
    );

    expect(response.status).toBe(404);
  });

  /**
   * NOTE /books/:id (PATCH)
   */
  it('/books/:id (PATCH) - should return book element', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/books/${createdBook._id}`)
      .send({ title: 'Updated test Book' });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(response.body.title).toEqual('Updated test Book');
    expect(response.body.author).toEqual('Test Author');
  });
  it('/books/:id (PATCH) - should return 404', async () => {
    const response = await request(app.getHttpServer()).get(
      `/books/${new Types.ObjectId()}`,
    );

    expect(response.status).toBe(404);
  });

  /**
   * NOTE /books/:id (DELETE)
   */
  it('/books/:id (DELETE) - should return book element', async () => {
    const response = await request(app.getHttpServer()).delete(
      `/books/${createdBook._id}`,
    );

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(response.body.title).toEqual('Updated test Book');
    expect(response.body.author).toEqual('Test Author');
  });
  it('/books/:id (DELETE) - should return 404', async () => {
    const response = await request(app.getHttpServer()).delete(
      `/books/${createdBook._id}`,
    );

    expect(response.status).toBe(404);
  });
});
