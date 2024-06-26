import { ContentService } from '@oryx-frontend/content';
import { ContextService } from '@oryx-frontend/core';
import { createInjector, destroyInjector } from '@oryx-frontend/di';
import { RouterService } from '@oryx-frontend/router';
import { of } from 'rxjs';
import { ArticlePageDescriptionMetaResolver } from './article-page-description-meta.resolver';

const mockContentService = {
  get: vi.fn(),
};

const mockContextService = {
  get: vi.fn(),
};

const mockRouterService = {
  currentRoute: vi.fn(),
};

describe('ArticlePageDescriptionMetaResolver', () => {
  let service: ArticlePageDescriptionMetaResolver;

  beforeEach(() => {
    const testInjector = createInjector({
      providers: [
        {
          provide: ArticlePageDescriptionMetaResolver,
          useClass: ArticlePageDescriptionMetaResolver,
        },
        {
          provide: ContextService,
          useValue: mockContextService,
        },
        {
          provide: ContentService,
          useValue: mockContentService,
        },
        {
          provide: RouterService,
          useValue: mockRouterService,
        },
      ],
    });

    service = testInjector.inject(ArticlePageDescriptionMetaResolver);
  });

  afterEach(() => {
    destroyInjector();
    vi.resetAllMocks();
  });

  describe('getScore', () => {
    it('should return proper value if article exist', () => {
      const callback = vi.fn();
      mockContextService.get.mockReturnValueOnce(of('id'));
      mockContextService.get.mockReturnValue(of('article'));
      mockRouterService.currentRoute.mockReturnValue(of(`/article/saf`));
      service.getScore().subscribe(callback);
      expect(callback).toHaveBeenCalledWith(['id', 'article', true]);
    });

    it('should return proper value if article is not exist', () => {
      const callback = vi.fn();
      mockContextService.get.mockReturnValue(of(undefined));
      mockRouterService.currentRoute.mockReturnValue(of(''));

      service.getScore().subscribe(callback);
      expect(callback).toHaveBeenCalledWith([undefined, undefined, false]);
    });
  });

  describe('resolve', () => {
    it('should return proper object with article description', () => {
      const callback = vi.fn();
      mockContextService.get.mockReturnValueOnce(of('id'));
      mockContextService.get.mockReturnValue(of('type'));
      mockContentService.get.mockReturnValue(
        of({
          fields: {
            description: 'Description A',
          },
        })
      );
      service.resolve().subscribe(callback);
      expect(mockContentService.get).toHaveBeenCalledWith({
        id: 'id',
        type: 'type',
        entities: ['type'],
      });
      expect(callback).toHaveBeenCalledWith({
        description: 'Description A',
      });
    });
  });
});
