export async function registerSW(
  scriptURL: string | URL,
  options?: RegistrationOptions | undefined
) {
    if (!("serviceWorker" in navigator)) throw new Error('unsupported');
    
    const registration = await navigator.serviceWorker.register(scriptURL, options);

    if (import.meta.env.DEV) {
        registration.addEventListener('updatefound', () => {
            console.info('[sw.js] updated');
        })

        window.setInterval(() => {
            registration.update();
        }, 1000)
    }
}
