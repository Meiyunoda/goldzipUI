import { ColorModeScript } from '@chakra-ui/react'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import { Provider as StyletronProvider } from 'styletron-react'
import { styletron } from '../styletron'
import theme from "../theme"

export default class MyDocument extends Document {
  static async getInitialProps(context) {
    const renderPage = () =>
      context.renderPage({
        enhanceApp: (App) => (props) =>
        (
          <StyletronProvider value={styletron}>
            <App {...props} />
          </StyletronProvider>
        ),
      })

    const initialProps = await Document.getInitialProps({
      ...context,
      renderPage,
    })
    const stylesheets = styletron.getStylesheets() || []
    return { ...initialProps, stylesheets }
  }

  render() {
    return (
      <Html lang="en">
        <Head >
          {this.props.stylesheets.map((sheet, i) => (
            <style
              className="_styletron_hydrate_"
              dangerouslySetInnerHTML={{ __html: sheet.css }}
              media={sheet.attrs.media}
              data-hydrate={sheet.attrs['data-hydrate']}
              key={i}
            />
          ))}
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#2b5797" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
