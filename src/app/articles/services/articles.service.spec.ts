import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ArticlesService } from './articles.service';
import { ArticleFromServerInterface } from '../types/articleFromServer.interface';

describe('ArticlesService', () => {
  let service: ArticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticlesService],
    });
    service = TestBed.inject(ArticlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an article', () => {
    const mockArticle = {
      id: 1,
      title: 'Test title',
      description: 'Test description',
    };
    service.addArticle(mockArticle).subscribe((response) => {
      expect(response).toEqual(mockArticle);
    });
  });

  it('should modify interface correctly', () => {
    const mockItem: ArticleFromServerInterface = {
      id: 1,
      userId: 1,
      title: 'Test title',
      body: 'Test description',
    };

    const modifiedItem = service.modifyInterface(mockItem);

    expect(modifiedItem).toEqual({
      id: 1,
      title: 'Test title',
      description: 'Test description',
    });
  });
});
