import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile('assets/js/profile-access.js', 'utf8');

class Element {
  constructor(dataset = {}) { this.dataset = dataset; this.listeners = {}; this.children = []; this.hidden = false; this.textContent = ''; this.open = false; }
  addEventListener(type, callback) { this.listeners[type] = callback; }
  click() { this.listeners.click?.({ target: this }); }
  showModal() { this.open = true; }
  close() { this.open = false; }
  append(element) { this.children = this.children.filter(item => item !== element); this.children.push(element); }
  querySelectorAll(selector) { return selector === '[data-profile]' ? this.profileButtons : this.children; }
}

function environment(saved = new Map()) {
  const dialog = new Element();
  const profileButtons = ['recruiter', 'teacher', 'visitor'].map(profile => new Element({ profile }));
  dialog.profileButtons = profileButtons;
  const elements = { profileDialog: dialog, changeProfile: new Element(), closeProfileDialog: new Element(), currentProfileLabel: new Element(), profileContext: new Element(), 'lang-pt': new Element(), 'lang-en': new Element() };
  const experiences = new Element(); experiences.children = ['ndm','monitor','education','courses'].map(experience => new Element({ experience }));
  const projects = new Element(); projects.children = ['ndm','bank','aeds'].map(project => new Element({ project }));
  const document = {
    body: { dataset: {} }, documentElement: { lang: 'pt-BR' },
    addEventListener: (_type, callback) => callback(), getElementById: id => elements[id],
    querySelector: selector => selector.includes('experiencias') ? experiences : projects
  };
  const context = {
    document, localStorage: { getItem: key => saved.get(key) ?? null, setItem: (key, value) => saved.set(key, value) },
    window: { dispatchEvent() {} }, CustomEvent: class { constructor(type, init) { this.type = type; this.detail = init.detail; } }, setTimeout
  };
  vm.runInNewContext(source, context);
  return { saved, dialog, profileButtons, elements, experiences, projects, document };
}

test('primeira visita solicita perfil e persiste a escolha', () => {
  const app = environment();
  assert.equal(app.dialog.open, true);
  assert.equal(app.elements.closeProfileDialog.hidden, true);
  app.profileButtons[0].click();
  assert.equal(app.saved.get('luiz-maia.portfolio.profile.v1'), 'recruiter');
  assert.equal(app.document.body.dataset.profile, 'recruiter');
  assert.deepEqual(app.experiences.children.map(item => item.dataset.experience), ['ndm','education','monitor','courses']);
});

test('nova sessão recupera o perfil sem perguntar novamente', () => {
  const storage = new Map([['luiz-maia.portfolio.profile.v1', 'teacher']]);
  const app = environment(storage);
  assert.equal(app.dialog.open, false);
  assert.equal(app.document.body.dataset.profile, 'teacher');
  assert.equal(app.elements.currentProfileLabel.textContent, 'Professor');
  assert.deepEqual(app.projects.children.map(item => item.dataset.project), ['aeds','bank','ndm']);
});

test('botão do cabeçalho permite trocar o perfil', () => {
  const app = environment(new Map([['luiz-maia.portfolio.profile.v1', 'visitor']]));
  app.elements.changeProfile.click();
  assert.equal(app.dialog.open, true);
  assert.equal(app.elements.closeProfileDialog.hidden, false);
  app.profileButtons[1].click();
  assert.equal(app.saved.get('luiz-maia.portfolio.profile.v1'), 'teacher');
});

test('CSS mantém modal fluido, toque acessível e breakpoint existente', async () => {
  const css = await readFile('assets/css/style.css', 'utf8');
  assert.match(css, /\.profile-dialog\s*\{[^}]*width:\s*min\(/s);
  assert.match(css, /min-height:\s*(44px|5rem)/);
  assert.match(css, /@media \(min-width:\s*768px\)/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});
