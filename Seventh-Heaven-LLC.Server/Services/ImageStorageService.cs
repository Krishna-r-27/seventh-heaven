using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.Processing;

namespace Seventh_Heaven_LLC.Server.Services
{
    public class ImageStorageService
    {
        private readonly IWebHostEnvironment _env;

        public ImageStorageService(IWebHostEnvironment env)
        {
            _env = env;
        }

        public async Task<(string webpPath, string originalPath)> SaveImageAsync(
            IFormFile file,
            string folder,
            int maxSize = 1500,
            int quality = 80)
        {
            if (file == null || file.Length == 0)
                throw new InvalidOperationException("Empty file.");

            var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
            var allowed = new[] { ".jpg", ".jpeg", ".png", ".webp" };
            var ok = false;
            for (var i = 0; i < allowed.Length; i++)
            {
                if (ext == allowed[i]) { ok = true; break; }
            }
            if (!ok)
                throw new InvalidOperationException($"Unsupported image type '{ext}'. Use jpg, jpeg, png, or webp.");

            var webRoot = _env.WebRootPath ?? Path.Combine(_env.ContentRootPath, "wwwroot");
            var uploadRoot = Path.Combine(webRoot, "uploads", folder);
            Directory.CreateDirectory(uploadRoot);

            var baseName = Guid.NewGuid().ToString("N");
            var originalFileName = baseName + ext;
            var webpFileName = baseName + ".webp";

            var originalPath = Path.Combine(uploadRoot, originalFileName);
            var webpPath = Path.Combine(uploadRoot, webpFileName);

            using (var image = await Image.LoadAsync(file.OpenReadStream()))
            {
                var w = image.Width;
                var h = image.Height;
                if (w > maxSize || h > maxSize)
                {
                    var ratio = Math.Min((float)maxSize / w, (float)maxSize / h);
                    var newW = (int)(w * ratio);
                    var newH = (int)(h * ratio);
                    image.Mutate(x => x.Resize(newW, newH));
                }

                if (ext == ".png")
                {
                    var encoder = new PngEncoder { CompressionLevel = PngCompressionLevel.Level6 };
                    await image.SaveAsync(originalPath, encoder);
                }
                else
                {
                    var encoder = new JpegEncoder { Quality = quality };
                    await image.SaveAsync(originalPath, encoder);
                }

                var webpEncoder = new WebpEncoder { Quality = quality };
                await image.SaveAsync(webpPath, webpEncoder);
            }

            var relRoot = $"/uploads/{folder}";
            return ($"{relRoot}/{webpFileName}", $"{relRoot}/{originalFileName}");
        }

        public async Task<string> SaveCompressedOriginalAsync(
            IFormFile file,
            string folder,
            int maxSize = 1500,
            int quality = 80)
        {
            if (file == null || file.Length == 0)
                throw new InvalidOperationException("Empty file.");

            var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
            var allowed = new[] { ".jpg", ".jpeg", ".png", ".webp" };
            var ok = false;
            for (var i = 0; i < allowed.Length; i++)
            {
                if (ext == allowed[i]) { ok = true; break; }
            }
            if (!ok)
                throw new InvalidOperationException($"Unsupported image type '{ext}'. Use jpg, jpeg, png, or webp.");

            var webRoot = _env.WebRootPath ?? Path.Combine(_env.ContentRootPath, "wwwroot");
            var uploadRoot = Path.Combine(webRoot, "uploads", folder);
            Directory.CreateDirectory(uploadRoot);

            var baseName = Guid.NewGuid().ToString("N");
            var originalFileName = baseName + ext;
            var originalPath = Path.Combine(uploadRoot, originalFileName);

            using (var image = await Image.LoadAsync(file.OpenReadStream()))
            {
                var w = image.Width;
                var h = image.Height;
                if (w > maxSize || h > maxSize)
                {
                    var ratio = Math.Min((float)maxSize / w, (float)maxSize / h);
                    var newW = (int)(w * ratio);
                    var newH = (int)(h * ratio);
                    image.Mutate(x => x.Resize(newW, newH));
                }

                if (ext == ".png")
                {
                    var encoder = new PngEncoder { CompressionLevel = PngCompressionLevel.Level6 };
                    await image.SaveAsync(originalPath, encoder);
                }
                else
                {
                    var encoder = new JpegEncoder { Quality = quality };
                    await image.SaveAsync(originalPath, encoder);
                }
            }

            var relRoot = $"/uploads/{folder}";
            return $"{relRoot}/{originalFileName}";
        }

        public void DeleteImagePair(string? webpPath, string? originalPath)
        {
            var webRoot = _env.WebRootPath ?? Path.Combine(_env.ContentRootPath, "wwwroot");

            if (!string.IsNullOrWhiteSpace(webpPath))
            {
                var p = Path.Combine(webRoot, webpPath.TrimStart('/').Replace('/', Path.DirectorySeparatorChar));
                if (File.Exists(p)) File.Delete(p);
            }

            if (!string.IsNullOrWhiteSpace(originalPath))
            {
                var p = Path.Combine(webRoot, originalPath.TrimStart('/').Replace('/', Path.DirectorySeparatorChar));
                if (File.Exists(p)) File.Delete(p);
            }
        }
    }
}

