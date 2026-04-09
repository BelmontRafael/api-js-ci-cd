import assert from "node:assert/strict";
import test from "node:test";

import Usuario from "../../usuarios/model.js";

test("Usuario model has required fields", () => {
  const attrs = Usuario.getAttributes();

  assert.ok(attrs.id);
  assert.equal(attrs.id.primaryKey, true);
  assert.equal(attrs.id.autoIncrement, true);

  assert.ok(attrs.nome);
  assert.equal(attrs.nome.allowNull, false);

  assert.ok(attrs.email);
  assert.equal(attrs.email.allowNull, false);

  assert.ok(attrs.senha);
  assert.equal(attrs.senha.allowNull, false);

  assert.ok(attrs.data_nascimento);
  assert.equal(attrs.data_nascimento.allowNull, false);
});
