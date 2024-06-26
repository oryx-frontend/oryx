import { OBJECT_FIT, OBJECT_POSITION } from '@oryx-frontend/ui';
import { lastValueFrom } from 'rxjs';
import { ObjectFit } from './media-style.model';
import { MediaStylePlugin } from './media-style.plugin';

describe('MediaStylePlugin', () => {
  let plugin: MediaStylePlugin;

  beforeEach(() => {
    plugin = new MediaStylePlugin();
  });

  describe('getConfig', () => {
    it('should return proper schema in the object', async () => {
      const schema = await import('./media-style.schema').then(
        (module) => module.schema
      );
      const config = await lastValueFrom(plugin.getConfig?.());
      const result = await (config.schema as () => unknown)();

      expect(result).toEqual(schema);
    });
  });

  describe('getStyleProperties', () => {
    it('should return a LayoutStyleProperties object', async () => {
      const styles = {
        objectFit: ObjectFit.Cover,
        objectPosition: 'center',
      };
      const styleProperties = {
        [OBJECT_FIT]: ObjectFit.Cover,
        [OBJECT_POSITION]: 'center',
      };
      const result = await lastValueFrom(
        plugin.getStyleProperties({ styles, options: {} })
      );

      expect(result).toEqual(styleProperties);
    });
  });
});
