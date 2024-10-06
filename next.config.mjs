// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Ignore 'canvas' module on server-side build
      config.externals.push({
        canvas: "canvas",
      });
    }

    return config;
  },
};

export default nextConfig;
