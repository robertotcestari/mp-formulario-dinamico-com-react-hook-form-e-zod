import FormHeader from './components/FormHeader';
import Form from './components/Form';

function App() {
  return (
    <main className="min-h-screen p-24 bg-sky-50">
      <div className="container max-w-md px-10 py-6 mx-auto border-2 border-slate-300 rounded-2xl">
        <FormHeader />
        <Form />
      </div>
    </main>
  );
}

export default App;
