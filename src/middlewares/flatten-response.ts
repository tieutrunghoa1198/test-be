const strapiFlatten = (data) => {
  const isObject = (data) =>
    Object.prototype.toString.call(data) === "[object Object]";
  const isArray = (data) =>
    Object.prototype.toString.call(data) === "[object Array]";

  const flatten = (data) => {
    if (!data.attributes) return data;

    return {
      id: data.id,
      ...data.attributes,
    };
  };

  if (isArray(data)) {
    return data.map((item) => strapiFlatten(item));
  }

  if (isObject(data)) {
    if (isArray(data.data)) {
      data = [...data.data];
    } else if (isObject(data.data)) {
      data = flatten({ ...data.data });
    } else if (data.data === null) {
      data = null;
    } else {
      data = flatten(data);
    }

    for (const key in data) {
      data[key] = strapiFlatten(data[key]);
    }
    return data;
  }
  return data;
};

async function response(ctx, next) {
  await next();
  if (!ctx.url.startsWith("/api") || !ctx.response.body.data) {
    return;
  }
  console.log(
    `API request (${ctx.url}) detected, transforming response json...`
  );
  ctx.response.body = {
    data: strapiFlatten(ctx.response.body.data),
    meta: ctx.response.body.meta,
  };
}

module.exports = () => response;
