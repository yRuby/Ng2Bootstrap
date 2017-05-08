import { Ng2bootstrapPage } from './app.po';

describe('ng2bootstrap App', () => {
  let page: Ng2bootstrapPage;

  beforeEach(() => {
    page = new Ng2bootstrapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
