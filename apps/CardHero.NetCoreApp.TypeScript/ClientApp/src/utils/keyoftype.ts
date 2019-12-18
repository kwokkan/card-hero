type KeyOfType<T, TProp> = { [P in keyof T]: T[P] extends TProp ? P : never }[keyof T];
