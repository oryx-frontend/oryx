import {
  createInjector,
  destroyInjector,
  getInjector,
} from '@oryx-frontend/di';
import { Size } from '@oryx-frontend/utilities';
import { lastValueFrom, of } from 'rxjs';
import { DefaultLayoutService } from './default-layout.service';
import { LayoutBuilder } from './layout.builder';
import { LayoutService } from './layout.service';
import {
  LayoutPlugin,
  LayoutPluginRenderParams,
  LayoutPluginType,
  LayoutPropertyPlugin,
} from './plugins';
import { ScreenService } from './screen.service';

const mockLayoutService = {
  getScreenMedia: vi.fn(),
};

const aLayoutPlugin = {
  getStyles: vi.fn(),
  getRender: vi.fn(),
};

const aLayoutPropertyPlugin = {
  getStyles: vi.fn(),
  getRender: vi.fn(),
};

const layoutBuilder = {
  getCompositionStyles: vi.fn(),
  getStylesFromOptions: vi.fn(),
};

describe('DefaultLayoutService', () => {
  let service: LayoutService;

  beforeEach(() => {
    mockFeatureVersion('1.2');
    createInjector({
      providers: [
        {
          provide: LayoutService,
          useClass: DefaultLayoutService,
        },
        {
          provide: ScreenService,
          useValue: mockLayoutService,
        },
        {
          provide: `${LayoutPlugin}a`,
          useValue: aLayoutPlugin,
        },
        {
          provide: `${LayoutPropertyPlugin}a`,
          useValue: aLayoutPropertyPlugin,
        },
        {
          provide: LayoutBuilder,
          useValue: layoutBuilder,
        },
      ],
    });

    service = getInjector().inject(LayoutService);
  });

  afterEach(() => {
    vi.resetAllMocks();
    destroyInjector();
  });

  describe('getStyles', () => {
    it('should resolve common styles', async () => {
      const promise = service.getStyles({
        layout: { type: LayoutPluginType.Layout },
      });
      const expected = (
        await import('./plugins/base.styles').then((module) => module.styles)
      ).toString();
      const styles = await lastValueFrom(promise);
      expect(styles).toBe(expected);
    });

    it('should resolve styles from layout plugin', async () => {
      const pluginStyles = { styles: 'a-styles' };
      aLayoutPlugin.getStyles.mockReturnValue(of(pluginStyles));
      const promise = service.getStyles({
        a: { type: LayoutPluginType.Layout },
      });
      const styles = await lastValueFrom(promise);
      expect(aLayoutPlugin.getStyles).toHaveBeenCalled();
      expect(styles).toContain(pluginStyles.styles);
    });

    it('should resolve styles from layout property plugin', async () => {
      const pluginStyles = { styles: 'a-styles' };
      aLayoutPropertyPlugin.getStyles.mockReturnValue(of(pluginStyles));
      const promise = service.getStyles({
        a: { type: LayoutPluginType.Property },
      });
      const styles = await lastValueFrom(promise);
      expect(aLayoutPropertyPlugin.getStyles).toHaveBeenCalled();
      expect(styles).toContain(pluginStyles.styles);
    });

    it('should resolve styles from layout plugin by breakpoints', async () => {
      const pluginStyles = { styles: 'styles', sm: 'a-styles' };
      aLayoutPlugin.getStyles.mockReturnValue(of(pluginStyles));
      mockLayoutService.getScreenMedia.mockReturnValue('@media');
      const promise = service.getStyles({
        a: {
          type: LayoutPluginType.Layout,
          included: [Size.Md],
          excluded: [Size.Lg],
        },
      });
      const styles = await lastValueFrom(promise);
      expect(mockLayoutService.getScreenMedia).toHaveBeenNthCalledWith(
        1,
        [Size.Md],
        [Size.Lg]
      );
      expect(mockLayoutService.getScreenMedia).toHaveBeenNthCalledWith(
        2,
        Size.Sm
      );

      expect(aLayoutPlugin.getStyles).toHaveBeenCalled();
      expect(styles).toContain(`@media {${pluginStyles.styles}}`);
      expect(styles).toContain(`@media {${pluginStyles.sm}}`);
    });
  });

  describe('getRender', () => {
    it(`should resolve render from layout plugin`, () => {
      const mockData = 'mockData';
      aLayoutPlugin.getRender.mockReturnValue(mockData);
      const result = service.getRender({
        token: 'a',
        type: LayoutPluginType.Layout,
        data: mockData as unknown as LayoutPluginRenderParams,
      });

      expect(aLayoutPlugin.getRender).toHaveBeenCalledWith(mockData);
      expect(result).toBe(mockData);
    });

    it(`should resolve render from layout property plugin`, () => {
      const mockData = 'mockData';
      aLayoutPropertyPlugin.getRender.mockReturnValue(mockData);
      const result = service.getRender({
        token: 'a',
        type: LayoutPluginType.Property,
        data: mockData as unknown as LayoutPluginRenderParams,
      });

      expect(aLayoutPropertyPlugin.getRender).toHaveBeenCalledWith(mockData);
      expect(result).toBe(mockData);
    });
  });

  describe('getStylesFromOptions', () => {
    it(`should call layoutBuilder.getCompositionStyles if composition in parameters`, () => {
      const data = {
        composition: [{ id: 'idA', type: 'type' }],
        screen: 'sm',
        activeHostOptions: { bleed: true },
      };
      service.getStylesFromOptions(data);
      expect(layoutBuilder.getCompositionStyles).toHaveBeenCalledWith(data);
    });

    it(`should call layoutBuilder.getStylesFromOptions if composition is not in parameters`, () => {
      const data = {
        rules: [{ id: 'idA', type: 'type' }],
        screen: 'sm',
        id: 'main',
        activeHostOptions: { bleed: true },
      };
      service.getStylesFromOptions(data);
      expect(layoutBuilder.getStylesFromOptions).toHaveBeenCalledWith(data);
      expect(layoutBuilder.getCompositionStyles).not.toHaveBeenCalled();
    });
  });
});
