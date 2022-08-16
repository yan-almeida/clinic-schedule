import moduleAlias from 'module-alias';
import * as path from 'path';

const files = path.resolve(__dirname, '../..');

moduleAlias.addAliases({
  '@app': path.join(files, 'src/@app'),
  '@core': path.join(files, 'src/@core'),
  '@infra': path.join(files, 'src/@infra'),
  '@utils': path.join(files, 'src/utils'),
  '@test': path.join(files, 'test'),
});
