# Предложения по улучшению эталона `schema/MasterServiceMeta.json`

> **Дата анализа:** 2026-05-15  
> **Эталон:** `schema/MasterServiceMeta.json` (Draft-07, **3131** строк, `title` + `type: object` на корне)  
> **Codegen:** TS — `json-schema-to-typescript` → `packages/ts/src/generated/MasterServiceMeta.ts` (~2101 строк, **69** экспортируемых типов/интерфейсов)  
> **Codegen:** Java — quicktype + Jackson → `packages/java/build/generated-sources/quicktype/` (**68** классов)

**Важно:** документ содержит **только рекомендации**. Схема при подготовке анализа **не изменялась**. Все предложения сформулированы так, чтобы **сохранить смысл и допустимые JSON-payload**; где нужны примеры из прода — это явно указано.

---

## 1. Цели

1. Устранить слабые типы: `Object`, `Map<String, Object>`, пустые `{}`, «потерянные» поля.
2. Согласовать TS и Java при одном SSOT.
3. Сделать схему предсказуемой для codegen **без** пост-обработки.
4. Улучшить читаемость имён в сгенерированном коде (без смены JSON-ключей).

---

## 2. Методология

| Шаг | Действие |
|-----|----------|
| 1 | Обход `definitions` (~50+ сущностей) и корневых `properties` |
| 2 | Сопоставление спорных мест с `MasterServiceMeta.ts` и `.java` |
| 3 | Классификация: ошибка структуры JSON Schema / неполный тип / косметика |
| 4 | Формулировка правки, не меняющей семантику существующих JSON |

### Приоритеты

| Приоритет | Смысл |
|-----------|--------|
| **P0** | Прямо даёт `Object`, `Map<String,Object>`, `{}` или теряет поле в TS |
| **P1** | Сильно влияет на типобезопасность или паритет TS/Java |
| **P2** | DX, именование, строгость |

---

## 3. Уже исправлено (не трогать)

| Что | Статус |
|-----|--------|
| Корень: `"title": "MasterServiceMeta"`, `"type": "object"` | **OK** — Java: один POJO `MasterServiceMeta` с полями `datamodel`, `routes`, … |
| Расширенный эталон (~3131 строк) | **OK** — полноценные `Route`, `RouteVersion`, `RouteStep`, `Trigger`, `Subject`, `Criteria`, … |

Без `title` + `type` quicktype генерировал union-обёртку (`MasterServiceMeta` + `MasterServiceMetaClass` + `Object[]`). Сейчас этой проблемы **нет**.

---

## 4. Сводная таблица открытых проблем

| # | Область | TS (сейчас) | Java (сейчас) | Приоритет |
|---|---------|-------------|---------------|-----------|
| 1 | `Record<string,string>`, `Record<string,Popup>` | `RecordStringString {}`, `RecordStringPopup {}` | `Map<String, Object>` | **P0** |
| 2 | `Screen`: `navigation` в `required`, нет в `properties` | поле **отсутствует** | `Object navigation` | **P0** |
| 3 | `WidgetLegacy`: `iuiComponentName` в `required` vs `uiComponentName` в props | `uiComponentName?`, required не отражён | `Object iuiComponentName` + `String uiComponentName` | **P0** |
| 4 | `ViewMetaWidget*`: `permissions` внутри схемы `widget` | `permissions` **не генерируется** | **не генерируется** | **P0** |
| 5 | `FieldType` enum без `"DMN"`, ветки `WidgetField` с `type: "DMN"` | union с `"DMN"` ✓ | `FieldType` enum без DMN | **P1** |
| 6 | `WidgetLegacy` + `WidgetMeta` | раздельные типы ✓ | один класс `Widget` | **P1** |
| 7 | `View.widgets` union legacy/meta | union ✓ | один `ViewMetaWidget` | **P1** |
| 8 | `navigation.menu` union группа/пункт | union ✓ | merged `PickViewNavigation…` | **P1** |
| 9 | `MetaNode` без `oneOf` по `discriminator` | все ветки опциональны | то же | **P1** |
| 10 | Имена definitions (`Pick<…>`, `{type:string;…}`) | длинные имена | длинные / merged классы | **P2** |
| 11 | Нет `additionalProperties` в SSOT | открытые объекты | то же | **P2** |
| 12 | `anyOf` с одним `$ref` | шум | упрощение | **P2** |

---

## 5. P0 — критические улучшения

### 5.1. `Record<string,string>` и `Record<string,Popup>`

**Схема (стр. 6–13):**

```json
"Record<string,string>": {
    "description": "Construct a type with a set of properties K of type T",
    "type": "object"
}
```

**Сейчас:**
- TS: `export interface RecordStringString {}` — нет индексной сигнатуры; `pickMap` / `popups` по сути «пустой объект».
- Java: `Map<String, Object>` в `Field.java`, `WidgetField.java`.

**Смысл данных:** словарь `ключ → string` и `ключ → Popup`.

**Предложение (эквивалент `Record<K,V>`, JSON-ключи не меняются):**

```json
"Record<string,string>": {
  "type": "object",
  "additionalProperties": { "type": "string" },
  "description": "Строковый словарь (ключ → значение)"
},
"Record<string,Popup>": {
  "type": "object",
  "additionalProperties": { "$ref": "#/definitions/Popup" },
  "description": "Словарь popup-конфигураций по ключу"
}
```

**Ожидаемый результат:**
- TS: `{ [key: string]: string }` / `{ [key: string]: Popup }`.
- Java: `Map<String, String>` / `Map<String, Popup>`.

**Затронуто:** все `pickMap`, `popups` в ветках `WidgetField`, definition `Popup`, `WidgetTableHierarchy`, и т.д.

**Опционально (косметика):** переименовать definition в `StringMap` / `PopupMap` — в payload имена ключей не меняются.

---

### 5.2. `Screen.navigation` — в `required`, но нет в `properties`

**Схема:** `Screen.required` включает `"navigation"` (стр. ~2137–2142), в `properties` (стр. ~2101–2135) поля `navigation` **нет**.

**Сейчас:**
- TS: `interface Screen` **без** `navigation`.
- Java: `private Object navigation` — обязательное поле неизвестного типа.

**Риск:** TS и Java расходятся; контракт требует поле, которого нет в TS-типах.

**Предложение:**

1. **Собрать примеры JSON** экранов из прода: что лежит в `screen.navigation`?
2. Добавить в `Screen.properties`, например:

```json
"navigation": {
  "description": "Навигация экрана (структура — по эталонным payload)",
  "$ref": "#/definitions/ViewNavigationGroup"
}
```

или массив / обёртка — **по факту данных**.

3. Если поле в проде **никогда не приходит**, но остаётся в API — продуктовое решение: убрать из `required` (отдельное согласование).

**Не оставлять:** `required` без `properties` — антипаттерн Draft-07.

**Связанные типы в схеме:** `ViewNavigationGroup`, `ViewNavigationItem` — кандидаты для `$ref`, если структура совпадает с меню учёта.

---

### 5.3. `WidgetLegacy` — опечатка `iuiComponentName` в `required`

**Схема (стр. ~1059–1088):**

```json
"uiComponentName": { "type": "string", ... },
"required": ["id", "url", "iuiComponentName", "title", "type"]
```

**Сейчас:**
- TS: `uiComponentName?: string` (опционально).
- Java: `String uiComponentName` + `Object iuiComponentName`.

**Смысл:** одно поле — имя UI-компонента; в JSON ключ всегда `uiComponentName`.

**Предложение:**

```json
"required": ["id", "url", "uiComponentName", "title", "type"]
```

Поведение для существующих JSON **не меняется** — исправляется только соответствие `required` ↔ `properties`.

---

### 5.4. `ViewMetaWidgetLegacy` / `ViewMetaWidget` — `permissions` ошибочно внутри `widget`

**Схема (стр. ~1991–2012, ~2035–2056):** внутри описания поля `widget` рядом с `anyOf` лежит sibling `permissions` + `"type": "object"` — это **невалидная** смесь уровней для Draft-07 (keywords объекта-схемы поля `widget` перемешаны с описанием `ViewMetaWidget*`).

**Сейчас:**
- TS: `ViewMetaWidgetLegacy` / `ViewMetaWidget` **без** `permissions`.
- Java: `ViewMetaWidget` **без** `permissions`.

**Смысл:** полномочия относятся к **размещению виджета на view** (рядом с `widgetName`), как задумано в тексте description.

**Предложение:** вынести `permissions` на уровень `ViewMetaWidgetLegacy.properties` / `ViewMetaWidget.properties`:

```json
"ViewMetaWidgetLegacy": {
  "properties": {
    "gridWidth": { ... },
    "position": { ... },
    "widgetName": { ... },
    "widget": { "$ref": "#/definitions/WidgetLegacy" },
    "permissions": {
      "description": "Полномочие, необходимое для работы пользователя с виджетом",
      "type": "array",
      "items": {
        "oneOf": [
          { "$ref": "#/definitions/Permission" },
          { "$ref": "#/definitions/BasePermission" }
        ]
      }
    }
  },
  ...
}
```

**Перед правкой:** убедиться по JSON, что `permissions` в payload на **том же уровне**, что `widgetName`, а не внутри `widget`.

**Ожидаемый результат:**
- TS: `permissions?: (Permission | BasePermission)[]`.
- Java: поле на `ViewMetaWidget` (или раздельных классах после разделения legacy/meta).

---

## 6. P1 — высокий приоритет

### 6.1. `FieldType` и ветка `DMN` в `WidgetField`

**Факт:** в `FieldType.enum` (стр. ~56–84) значения `"DMN"` **нет**, но в `WidgetField.anyOf` есть ветки с `"type": { "enum": ["DMN"] }` (стр. ~933, ~1723, ~1752).

**Сейчас:**
- TS: в union `WidgetField` есть `type: "DMN"`; в `FieldType` — **нет**.
- Java: `FieldType` enum без DMN; при `type: "DMN"` десериализация через enum **упадёт** (`Cannot deserialize FieldType`).

**Предложение:** добавить `"DMN"` в `definitions/FieldType.enum` (если это отдельный тип поля в домене, а не опечатка).

**Не путать** с `WidgetTypes.PickListPopupForDMN` — это тип **виджета**, не поля.

---

### 6.2. quicktype сливает `WidgetLegacy` и `WidgetMeta` → `Widget`

**TS:** отдельные `WidgetLegacy` и `WidgetMeta` — корректно.

**Java:** один `Widget.java` со всеми полями (`url`, `boSystemId`, `fields`, `Object iuiComponentName`, …).

**Предложения (без смены JSON):**
- Явный `oneOf` + `discriminator` по полю `type` (разные enum: legacy vs meta).
- Добавить `"title": "WidgetLegacy"` / `"title": "WidgetMeta"` в definitions (иногда помогает quicktype).

---

### 6.3. `View.widgets` — union `ViewMetaWidgetLegacy | ViewMetaWidget`

**Схема:** `anyOf` двух ref, не массив (имя `widgets` во множественном числе — историческое).

**Сейчас:**
- TS: `widgets: ViewMetaWidgetLegacy | ViewMetaWidget` ✓
- Java: `ViewMetaWidget widgets` — merge, без различия legacy/meta

**Предложение:** `oneOf` + discriminant (если есть надёжный маркер в JSON). Уточнить у домена: в проде `widgets` — **один** объект-обёртка или **массив** (если массив — отдельное согласование, это уже смена формы).

---

### 6.4. `navigation.menu` — union группы и пункта

**Схема (корень, стр. ~3088–3127):** `anyOf` [Pick group, allOf item + required `screenName`/`viewName`].

**Сейчас:**
- TS: корректный union в `MasterServiceMeta.navigation.menu` ✓
- Java: `Navigation.menu` как `PickViewNavigationGroupTitleHiddenChildDefaultView[]`; класс содержит **и** `child`/`title`, **и** `screenName`/`viewName` — union «размазан»

**Предложения:**
1. Переименовать Pick-definitions → `ViewNavigationGroupMenu`, `ViewNavigationItemMenu`.
2. `oneOf` вместо `anyOf` для взаимоисключающих форм.
3. Опциональный const-discriminant (`"itemType": "group" | "link"`) — **только после согласования с бэкендом** (новый ключ в JSON).

---

### 6.5. `MetaNode` — слабая связь `discriminator` ↔ `node` / `field` / `boSystem`

**Схема:** `discriminator`: `FIELDD | SBLOCK | TEMPLATE`; все вложенные объекты опциональны.

**Предложение:** `oneOf` по значению `discriminator` + общие поля через `allOf` (стандартный паттерн для j2ts/quicktype).

**Внимание:** `FIELDD` — возможная опечатка (`FIELD`?); исправление enum **меняет** допустимые строки → только после сверки с БД/API.

---

### 6.6. `OperationInclusionDescriptor` и inline-definition

**Схема:** definition с именем  
`{type:string;include?:OperationInclusionDescriptor[]|undefined;exclude?:string[]|undefined;}`

**Сейчас:**
- TS: `TypeStringIncludeOperationInclusionDescriptorUndefinedExcludeStringUndefined` — работает, нечитаемо.
- Java: отдельный класс + custom (de)serializer.

**Предложение:** переименовать definition → `OperationInclusionGroup`; сохранить `anyOf` [object, string].

---

### 6.7. Multifield — inline definition с TS-именем

**Схема:** `{type:FieldType.multifield;fields:WidgetField[];style:"inline"|"list";}`

**TS:** `TypeFieldType` (поля `fields`, `style`, `type: "multifield"`).

**Предложение:** переименовать → `WidgetMultifieldField` (имя definition не влияет на JSON).

---

## 7. P2 — гигиена и DX

### 7.1. `anyOf` с единственным `$ref`

Примеры: `primaryViews.items`, `routes.items`, `datamodel.items`, `widget.anyOf` с одним элементом.

**Предложение:** `"items": { "$ref": "#/definitions/View" }` — тот же смысл, проще для генераторов.

---

### 7.2. `additionalProperties` отсутствует в SSOT

В эталоне **нигде** не задан `additionalProperties`.

**Предложение:**
- Закрытые DTO: `"additionalProperties": false`
- Словари: `additionalProperties` с типом (см. §5.1)

В `codegen.mjs` для j2ts уже `additionalProperties: false` — лучше зафиксировать в SSOT для единой runtime-валидации (Ajv).

---

### 7.3. `ViewNavigationGroup.id`: `type: ["string", "number"]`

**TS:** `id?: string | number` ✓  
**Java:** класс `ID` с custom serializer — тяжело в использовании.

**Предложение:** унифицировать тип в схеме после аудита прод-данных (`string` или явный `oneOf`).

---

### 7.4. Дублирование `TableOperations` в TS

В TS: `TableOperations` и `TableOperations1` (артефакт j2ts). В схеме одно definition — проверить отсутствие второго неявного inline-определения.

---

### 7.5. `WidgetShowCondition.params` — inline object

**Предложение:** вынести `WidgetShowConditionParams` с `$ref` на `DataValue` для `value`.

---

### 7.6. `WidgetField` — `anyOf` + `allOf`

**TS:** хорошие discriminated unions по `type` ✓  
**Java:** один `WidgetField` / `Field` со всеми optional-полями.

**Предложение:** верхний уровень `oneOf` вместо `anyOf`, если ветки взаимоисключающие; в каждой ветке `required: ["type"]` + уникальный `enum`/`const`.

---

### 7.7. Объекты без `required`

`Permission`, `BusinessComponent`, `Route`, `Role`, … — многие поля опциональны.

**Предложение:** добавлять `required` **по слоям** после сверки с БД/сервисом — ужесточение контракта, не смена типов.

---

### 7.8. `RouteCondition.value` только `number`

Если в проде бывают строковые значения — расширить тип (`oneOf` string/number) или отдельные поля. Только после аудита payload.

---

## 8. Что уже хорошо (не ломать без причины)

| Область | TS | Java |
|---------|-----|------|
| Корень `MasterServiceMeta` | `interface` с полным набором | POJO `MasterServiceMeta` |
| `FieldType`, `WidgetTypes` | string literal unions | enums |
| `WidgetField` по `type` | большой discriminated union | плоский класс (см. §6.6) |
| `DataValue` | union массива и enum | custom union |
| `Route*`, `Trigger*`, `Subject`, `Criteria` | отдельные интерфейсы | отдельные классы |
| `date-time` поля | `string` | `OffsetDateTime` (MetaNode, Route, …) |
| `MasterServiceMeta.navigation` | структурированный тип | `Navigation` |

---

## 9. Расхождения TS vs Java (при текущем эталоне)

| Тема | TS (j2ts) | Java (quicktype) |
|------|-----------|------------------|
| Record-типы | `{}` | `Map<String,Object>` |
| `Screen.navigation` | отсутствует | `Object` |
| `WidgetLegacy` / `WidgetMeta` | раздельно | `Widget` |
| `View` legacy/meta | union | `ViewMetaWidget` |
| Menu items | union | merged class |
| `FieldType` vs `DMN` | DMN только в WidgetField | enum без DMN |
| Имена | длинные, уникальные | merged, короче |

**Вывод:** большинство P0/P1 правок в **одном эталоне** улучшат оба языка; merge в Java часто требует `oneOf` / `discriminator`, не только `$ref`.

---

## 10. Рекомендуемый порядок внедрения

| Шаг | Задача | Риск |
|-----|--------|------|
| 1 | `iuiComponentName` → `uiComponentName` в `required` | Минимальный |
| 2 | `additionalProperties` для Record-типов | Минимальный |
| 3 | Вынести `permissions` из `widget` в `ViewMetaWidget*` | Средний (проверить уровень в JSON) |
| 4 | `Screen.navigation` + `$ref` | Средний (нужны примеры JSON) |
| 5 | `"DMN"` в `FieldType` | Низкий (если домен подтверждает) |
| 6 | Переименовать inline TS-definitions | Косметика |
| 7 | `MetaNode` `oneOf` по discriminator | Средний |
| 8 | `navigation.menu` `oneOf` + нормальные имена | Средний |
| 9 | P2-гигиена | По мере сил |

После каждого шага: `make codegen` → diff TS/Java → проверка потребителей.

---

## 11. Чеклист после правок

- [ ] В TS нет `RecordStringString {}` / `RecordStringPopup {}` без полей.
- [ ] В Java нет `Map<String, Object>` для `pickMap` / `popups`.
- [ ] `Screen` в TS и Java содержит `navigation` с осмысленным типом.
- [ ] `ViewMetaWidget*` содержит `permissions` в TS и Java.
- [ ] `WidgetLegacy.required` согласован с `uiComponentName`.
- [ ] `FieldType` покрывает все `type` из веток `WidgetField` (включая `DMN`).
- [ ] Эталонные JSON из прода/тестов проходят валидацию.

---

## 12. Ограничения анализа

- Статический разбор файлов; **команды сборки не запускались**.
- Реальные payload из прода не проверялись — для `Screen.navigation`, формы `widgets`, `RouteCondition.value` нужны примеры.
- Предложения не меняют бизнес-логику сами по себе; новые discriminants и правки enum — только с согласованием владельцев эталона.

---

*Файл: `docs/MasterServiceMeta-schema-improvements.md`. Схема при подготовке документа не изменялась.*
