interface InterceptedXHR extends XMLHttpRequest {
  _url?: string | URL;
}

(function () {
  const XHR = window.XMLHttpRequest;
  const originalOpen = XHR.prototype.open;
  const originalSend = XHR.prototype.send;

  XHR.prototype.open = function (
    this: InterceptedXHR,
    method: string,
    url: string | URL,
    ...args: any[]
  ) {
    this._url = url;
    return originalOpen.apply(this, [method, url, ...args] as any);
  };

  XHR.prototype.send = function (this: InterceptedXHR, body?: Document | XMLHttpRequestBodyInit | null) {
    this.addEventListener("load", function (this: InterceptedXHR) {
      try {
        const urlStr = typeof this._url === "string"
          ? this._url
          : this._url
            ? this._url.toString()
            : "";

        if (urlStr.includes("api/timedtext")) {
          window.postMessage(
            {
              source: "yt-caption-interceptor",
              url: this.responseURL || urlStr,
              raw: this.responseText
            },
            "*"
          );
        }
      } catch (e) {
        console.error("Error in caption interceptor:", e);
      }
    });
    return originalSend.call(this, body);
  };
})();
export {};
