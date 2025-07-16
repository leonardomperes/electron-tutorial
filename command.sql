CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT,  -- Opcional para contato
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,  -- Em centavos para evitar problemas com decimais
    category TEXT NOT NULL CHECK(category IN ('coffee', 'savory-snack', 'snack', 'plate-food', 'drink', 'dessert')),
    is_active INTEGER DEFAULT 1  -- Para "deletar" produtos sem remover do histórico
);

CREATE TABLE requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'open' CHECK(status IN ('open', 'preparing', 'ready', 'paid', 'canceled')),
    total_amount INTEGER NOT NULL DEFAULT 0,  -- Em centavos
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    observation TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE request_products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- ID próprio para permitir alterações
    request_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price INTEGER NOT NULL,  -- Preço no momento da venda (em caso de alteração)
    FOREIGN KEY (request_id) REFERENCES requests(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    request_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,  -- Em centavos
    method TEXT NOT NULL CHECK(method IN ('cash', 'credit', 'debit', 'pix', 'other')),
    received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES requests(id)
);
PRAGMA foreign_keys = ON;
-- DROP TABLE products;
-- DROP TABLE payments;
-- DROP TABLE request_products;
-- DROP TABLE requests;
-- DROP TABLE users;

