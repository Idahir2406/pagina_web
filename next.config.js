const nextConfig = {
  reactStrictMode: true,
  async rewrites(){
    return [
      {
        source: '/uploads/:path*',
        destination: '/api/uploads/:path*',
      },
    ];
  },
  images: {
    domains: [
      "www.nasa.gov",
      "th.bing.com",
      "www.lovelycraft.com",
      "i.pinimg.com",
      "lh3.googleusercontent.com",
      ""
    ],
  },
  env: {
    NEXTAUTH_SECRET: "mysecret",
    NEXTAUTH_JWT_SECRET: "myjwtsecret",
    NEXTAUTH_JWT_SIGNING_KEY: "myjwtsigningkey",
    NEXTAUTH_JWT_ENCRYPTION_KEY: "myjwtencryptionkey",
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./server.js');
    }

    return config;
  },
};

module.exports = nextConfig;
