Nova.booting((Vue, router, store) => {

  const listeners = []

  function navigateToResource(event) {

    const path = event.path || ( event.composedPath && event.composedPath() )

    const intersectsWithIgnoredElements = path.some(path =>
        path instanceof HTMLAnchorElement ||
        path instanceof HTMLInputElement ||
        path instanceof HTMLButtonElement ||
        path instanceof SVGElement)

    /**
     * Avoid following click when clicking on A tags or when selecting text
     */
    if (!intersectsWithIgnoredElements && window.getSelection().toString() === '') {

      const selector = 'a[dusk$="-' + ( event.altKey ? 'edit' : 'view' ) + '-button"]'
      const viewElement = this.querySelector(selector)

      if (viewElement) {

        viewElement.click()

      }

    }

  }

  Nova.$on('resources-loaded', () => {

    while (listeners.length) {

      listeners.pop().removeEventListener('click', navigateToResource)

    }

    Vue.nextTick(() => {

      const viewElement = document.querySelector('a[dusk$="-view-button"]')

      if (viewElement) {

        const rows = document.querySelectorAll('table[data-testid="resource-table"] tr[dusk$="-row"]')

        for (const row of rows) {

          row.style.cursor = 'pointer'
          row.addEventListener('click', navigateToResource)

          listeners.push(row)

        }
      }

    })

  })

})
