import { app } from "./app";
import { notFoundHandler } from "./utils/not-found";

const _self = self as unknown as ServiceWorkerGlobalScope;

_self.addEventListener("install", function () {
  _self.skipWaiting();
});

_self.addEventListener("activate", function (event) {
  event.waitUntil(_self.clients.claim());
});

app.notFound(notFoundHandler);

app.fire();
