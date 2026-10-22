import type {NextConfig} from 'next';
const config:NextConfig={
  serverExternalPackages:['node:sqlite'],
  ...(process.env.FORGE_DIST_DIR?{distDir:process.env.FORGE_DIST_DIR}:{}),
  outputFileTracingIncludes:{'/api/export':['./app/lib/**/*'],'/api/preview':['./app/lib/**/*']},
  async rewrites(){
    return [
      {
        source: '/:page(overview|analytics|customers|products|orders|tables|forms|team|chat|notifications|carousel|profile|theme|tasks|calendar|help|builder|components)',
        destination: '/?page=:page',
      },
    ];
  },
};
export default config;
