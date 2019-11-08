Nova.booting((Vue, router, store) => {

    const listeners = []

    function navigateToResource(event) {

        /**
         * Avoid following click when clicking on A tags or when selecting text
         */
        if (!(event.target instanceof HTMLAnchorElement) &&
            !(event.target instanceof HTMLInputElement) &&
             window.getSelection().toString() === '') {

            const viewElement = this.querySelector('a[dusk$="-view-button"]')

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

            const rows = document.querySelectorAll('table[data-testid="resource-table"] tr[dusk$="-row"]')

            for (const row of rows) {

                row.style.cursor = 'pointer'
                row.addEventListener('click', navigateToResource)

                listeners.push(row)

            }

        })

    })

})
