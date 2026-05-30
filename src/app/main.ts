import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as Sentry from '@sentry/vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
Sentry.init({
  app,
  dsn: 'https://f578bb02eeffeffb882a1c4d2526e5c7@o4511473655611392.ingest.de.sentry.io/4511473662165072',
  sendDefaultPii: true,
  beforeSend(event) {
    if (event.exception) {
      Sentry.showReportDialog({
        eventId: event.event_id,
        locale: 'ru',
      })
    }
    return event
  },
  integrations: [
    Sentry.feedbackIntegration({
      colorScheme: 'system',
    }),
  ],
})
app.use(createPinia())
app.use(router)

app.mount('#app')
