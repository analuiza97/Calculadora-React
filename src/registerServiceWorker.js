const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    //[::1] é o endereço de localhost do IPv6 
    window.location.hostname === '[::1]' ||
    //127.0.0.1/8 é o localhost do IPv4
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
)

export default function register() {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    //construtor de URL disponível em todos os navegadores que suportam SW
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location)
    if (publicUrl.origin !== window.location.origin) {
      return
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`

      if (isLocalhost) {
        //está sendo executado no localhost. Permite verificar se um service worker existe
        checkValidServiceWorker(swUrl)

        navigator.serviceWorker.ready.then(() => {})
      } else {
        //não é um host local. Basta registrar o  service worker
        registerValidSW(swUrl)
      }
    })
  }
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              //aqui o conteúdo antigo será removido e o novo conteúdo será adicionado ao cache
              console.log('New content is available; please refresh.')
            } else {
              console.log('Content is cached for offline use.')
            }
          }
        }
      }
    })
    .catch(error => {
      console.error('Error during service worker registration:', error)
    })
}

function checkValidServiceWorker(swUrl) {
  //verifica se o service worker pode ser encontrado. Se não for, recarrega a página
  fetch(swUrl)
    .then(response => {
      //verifica se o service worker existe e se realmente estamos obtendo um arquivo JS
      if (
        response.status === 404 ||
        response.headers.get('content-type').indexOf('javascript') === -1
      ) {
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload()
          })
        })
      } else {
        registerValidSW(swUrl)
      }
    })
    .catch(() => {
      console.log('No internet connection found. App is running in offline mode.')
    })
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister()
    })
  }
}