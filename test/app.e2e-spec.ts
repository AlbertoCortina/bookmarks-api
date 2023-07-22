import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/dto';
import { EditUserDto } from '../src/user/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
    await app.listen(3000);

    prismaService = app.get(PrismaService);
    await prismaService.cleanDatabase();

    pactum.request.setBaseUrl('http://localhost:3000/');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'test@test.com',
      password: 'test',
    };

    describe('Sign up', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('auth/signup')
          .withBody({ password: dto.password })
          .expectStatus(400)
          .inspect();
      });

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('auth/signup')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });

      it('should throw if no body provided', () => {
        return pactum.spec().post('auth/signup').withBody({}).expectStatus(400);
      });

      it('should sign up', () => {
        return pactum
          .spec()
          .post('auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Login', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('auth/login')
          .withBody({ password: dto.password })
          .expectStatus(400)
          .inspect();
      });

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('auth/login')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });

      it('should throw if no body provided', () => {
        return pactum.spec().post('auth/login').withBody({}).expectStatus(400);
      });

      it('should login', () => {
        return pactum
          .spec()
          .post('auth/login')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });

    describe('Edit user', () => {
      it('should edit user', () => {
        const dto: EditUserDto = {
          firstName: 'test',
          email: 'test@test.com',
        };

        return pactum
          .spec()
          .patch('users')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      });
    });
  });

  describe('Bookmarks', () => {
    describe('Create bookmark', () => {
      it.todo('work');
    });

    describe('Get bookmarks', () => {
      it.todo('work');
    });
    describe('Get bookmark by id', () => {
      it.todo('work');
    });
    describe('Edit bookmark by id', () => {
      it.todo('work');
    });
    describe('Delete bookmark', () => {
      it.todo('work');
    });
  });
});
