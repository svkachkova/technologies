React Router использует динамическую маршрутизацию(routing). Это значит, что маршрутизация происходит при рендеринге приложения(app).

```jsx
// index.js
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    el
);
```

```jsx
// App.js
const App = () => (
    <div>
        <nav>
            <Link to="/dashboard">Dashboard</Link>
        </nav>
        <div>
            <Route path="/dashboard" component={Dashboard} />
        </div>
    </div>
);
```
Динамическая маршрутизация. Маленький или большой экран.

```jsx
const App = () => (
    <AppLayout>
        <Route path="/invoices" component={Invoices} />
    </AppLayout>
);

const Invoices = () => (
    <Layout>
        {/* always show the nav */}
        <InvoicesNav />

        <Media query={PRETTY_SMALL}>
        {screenIsSmall =>
            screenIsSmall ? (
            // small screen has no redirect
            <Switch>
                <Route exact path="/invoices/dashboard" component={Dashboard} />
                <Route path="/invoices/:id" component={Invoice} />
            </Switch>
            ) : (
            // large screen does!
            <Switch>
                <Route exact path="/invoices/dashboard" component={Dashboard} />
                <Route path="/invoices/:id" component={Invoice} />
                <Redirect from="/invoices" to="/invoices/dashboard" />
            </Switch>
            )
        }
        </Media>
    </Layout>
);
```