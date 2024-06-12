import { SpyInstance } from 'vitest';
import { App, AppRef } from '../app';
import { InjectionPlugin, InjectionPluginName } from './injection';

const mockProviders = [
  {
    provide: 'A',
    useValue: 'value A',
  },
  {
    provide: 'B',
    useValue: 'value B',
  },
];
const mockOptions = {
  context: 'context',
};
const mockInjector = {
  createInjector: vi.fn(),
  destroyInjector: vi.fn(),
};

vi.mock('@oryx-frontend/di', () => ({
  createInjector: (value: unknown): SpyInstance =>
    mockInjector.createInjector(value),
  destroyInjector: (value: unknown): SpyInstance =>
    mockInjector.destroyInjector(value),
}));

describe('InjectionPlugin', () => {
  let plugin: InjectionPlugin;

  beforeEach(() => {
    plugin = new InjectionPlugin(mockProviders, mockOptions);
    vi.resetAllMocks();
  });

  describe('getName', () => {
    it('should return proper name', () => {
      expect(plugin.getName()).toBe(InjectionPluginName);
    });
  });

  describe('beforeApply', () => {
    it('should createInjector', () => {
      const mockApp = 'mockApp' as unknown as App;
      plugin.beforeApply(mockApp);
      expect(mockInjector.createInjector).toHaveBeenCalledWith({
        ...mockOptions,
        providers: [...mockProviders, { provide: AppRef, useValue: mockApp }],
      });
    });
  });

  describe('getInjector', () => {
    it('should return injector', () => {
      const mockInjectorValue = 'mockInjector';
      mockInjector.createInjector.mockReturnValue(mockInjectorValue);
      plugin.beforeApply('mockApp' as unknown as App);
      expect(plugin.getInjector()).toBe(mockInjectorValue);
    });
  });

  describe('destroy', () => {
    it('should call destroyInjector', () => {
      plugin.destroy();
      expect(mockInjector.destroyInjector).toHaveBeenCalledWith(
        mockOptions.context
      );
    });
  });
});
