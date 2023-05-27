import { E2EComponentFixture } from 'src/e2e/e2e-component.fixture';

export class AppFixture extends E2EComponentFixture {
  getTitle() {
    return this.page.getByRole('heading', { name: 'Hello World!' });
  }

  getDescription() {
    return this.page.getByText('Start your first app!', { exact: true });
  }

  getShowButton() {
    return this.page.getByRole('button', { name: 'Show success!' });
  }

  getSuccessMessage() {
    return this.page.getByText('Wow!');
  }
}
