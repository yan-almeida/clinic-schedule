import moduleAlias from 'module-alias';
import * as path from 'path';

const files = path.resolve(__dirname, '../..');

moduleAlias.addAliases({
  '@core': path.join(files, 'src/@core'),
  '@test': path.join(files, 'test'),
});
