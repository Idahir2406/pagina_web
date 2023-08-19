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
      "firebasestorage.googleapis.com",
    ],
  },
  env: {
    NEXTAUTH_SECRET: "mysecret",
    NEXTAUTH_JWT_SECRET: "myjwtsecret",
    NEXTAUTH_JWT_SIGNING_KEY: "myjwtsigningkey",
    NEXTAUTH_JWT_ENCRYPTION_KEY: "myjwtencryptionkey",
    NEXTAUTH_URL: "http://localhost:3000",
  },

};

module.exports = nextConfig;
