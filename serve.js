const readFile = (filePath) => {
  try {
    return Deno.readFileSync(filePath);
  } catch {
    return null;
  }
};

const response = (content, contentType, status) => {
  return new Response(content, {
    headers: { "content-type": contentType },
    status: status,
  });
};

const notFound = () => response("<h1>NOT FOUND</h1>", "text/html", 404);

const responseResource = (filePath, contentType, status) => {
  const fileData = readFile(`.${filePath}`);
  return fileData ? response(fileData, contentType, status) : notFound();
};

//split path by "." get extention
const mimeType = (path) => {
  if (path.endsWith(".css")) return "text/css";
  if (path.endsWith(".js")) return "application/javascript";
  if (path.endsWith(".ico")) return "image/x-icon";
  return "text/html";
};

const handleRequest = (request) => {
  const url = new URL(request.url);
  const filePath = url.pathname === "/" ? "/index.html" : url.pathname;
  const contentType = mimeType(filePath);
  const response = responseResource(filePath, contentType, 200);

  return response;
};

Deno.serve({ port: 8000 }, handleRequest);
