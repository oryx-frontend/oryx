import { isPromise } from '@oryx-frontend/utilities';
import { ResourcePlugin, ResourcePluginName } from './resources';

const mockSource = './source';

const mockResources = {
  graphics: {
    a: {
      url: './url/a',
    },
    b: {
      source: () => Promise.resolve(mockSource),
    },
  },
  icons: {
    list: {
      a: 'a',
      b: (): Promise<string> => Promise.resolve('b'),
    },
    types: {
      a: 'a',
      b: 'b',
    },
  },
  fonts: {
    a: 'A',
  },
};

describe('ResourcePlugin', () => {
  let plugin: ResourcePlugin;

  beforeEach(() => {
    plugin = new ResourcePlugin(mockResources);
    vi.resetAllMocks();
  });

  describe('when getName has been called', () => {
    it('should return proper name', () => {
      expect(plugin.getName()).toBe(ResourcePluginName);
    });
  });

  describe('when getGraphics has been called', () => {
    it('should return the list of graphics', () => {
      expect(plugin.getGraphics()).toEqual(mockResources.graphics);
    });
  });

  describe('when getGraphicValue has been called', () => {
    it('should return value', () => {
      expect(plugin.getGraphic('a', 'url')).toBe(mockResources.graphics?.a.url);
    });

    it('should return promise with value', async () => {
      const sourcePromise = plugin.getGraphic('b', 'source');
      expect(isPromise(sourcePromise)).toBe(true);
      expect(await sourcePromise).toBe(mockSource);
    });

    it('should return undefined if token is not exist', () => {
      expect(plugin.getGraphic('c', 'source')).toBeUndefined();
    });
  });

  describe('when getFont has been called', () => {
    it('should return the font of provided fonts', () => {
      expect(plugin.getFont('a')).toBe(mockResources.fonts.a);
    });
  });
});
