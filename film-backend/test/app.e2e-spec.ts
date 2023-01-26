import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

// app e2e est de tester chaque route si ca fonctione
describe('API endpoints testing (e2e)', () => {
  let app: INestApplication;
  let id: any;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableShutdownHooks();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('App', () => {
    it('Post /Register a New User', async () => {
      const res = await request(app.getHttpServer())
        .post('/users/register')
        .send({
          firstname: 'jean',
          lastname: 'jaques',
          email: 'jean.jaques@gmail.com',
          password: 'jean35480',
        });
      try {
        expect(res.status).toBe(201);
      } catch (err) {
        console.log(err);
      }
    });

    it('Post /Login Conneted User', async () => {
      const res = await request(app.getHttpServer())
        .post('/users/login')
        .send({ email: 'jean.jaques@gmail.com', password: 'jean35480' });
      expect(res.status).toBe(200);
      try {
        expect(res.body).toHaveProperty('users');
        id = res.body.users;
      } catch (err) {
        console.log(err);
      }
    });

    it('Post /Favoris', async () => {
      const res = await request(app.getHttpServer())
        .post('/favoris/shows')
        .send({
          showsId: 34683,
          users: 1,
        });
      try {
        expect(res.status).toBe(201);
      } catch (err) {
        console.log(err);
      }
    });

    it('Get /Favoris/Id ', async () => {
      const res = await request(app.getHttpServer()).get(
        `/users/favoris/${id}`,
      );
      expect(res.status).toBe(200);
    });

    it('Delete /Favoris/Id ', async () => {
      const res = await request(app.getHttpServer()).delete(`/favoris/2`);
      expect(res.status).toBe(200);
    });
  });
});
