/* eslint-disable */
/** Auto-generated from schema/MasterServiceMeta.json — do not edit. */

/**
 * Descriptor enabling operation on widget:
 * - string (if you just need to include / exclude operation or groups)
 * - object, if this is group in which you want to selectively include or exclude the operation
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "OperationInclusionDescriptor".
 */
export type OperationInclusionDescriptor =
  | TypeStringIncludeOperationInclusionDescriptorUndefinedExcludeStringUndefined
  | string;
/**
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "FieldType".
 */
export type FieldType =
  | "checkbox"
  | "checkboxSql"
  | "combo-condition"
  | "date"
  | "dateTime"
  | "dateTimeWithSeconds"
  | "dictionary"
  | "fileUpload"
  | "hidden"
  | "hint"
  | "inline-pickList"
  | "input"
  | "money"
  | "monthYear"
  | "multifield"
  | "multivalue"
  | "multivalueHover"
  | "number"
  | "percent"
  | "pickList"
  | "printForm"
  | "radio"
  | "richText"
  | "text"
  | "img";
/**
 * Field descriptor in widget configuration
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "WidgetField".
 */
export type WidgetField =
  | (WidgetListFieldBase & {
      digits?: number;
      nullable?: boolean;
      type: "money" | "number" | "percent";
    })
  | (WidgetFormFieldBase & {
      digits?: number;
      nullable?: boolean;
      type: "money" | "number" | "percent";
    })
  | (WidgetListFieldBase & {
      type: "date";
    })
  | (WidgetFormFieldBase & {
      type: "date";
    })
  | (WidgetListFieldBase & {
      type: "checkbox";
    })
  | (WidgetFormFieldBase & {
      type: "checkbox";
    })
  | (WidgetListFieldBase & {
      type: "dateTime";
    })
  | (WidgetFormFieldBase & {
      type: "dateTime";
    })
  | (WidgetListFieldBase & {
      type: "dateTimeWithSeconds";
    })
  | (WidgetFormFieldBase & {
      type: "dateTimeWithSeconds";
    })
  | (WidgetListFieldBase & {
      dictionaryName?: string;
      multiple?: boolean;
      type: "dictionary";
    })
  | (WidgetFormFieldBase & {
      dictionaryName?: string;
      multiple?: boolean;
      type: "dictionary";
    })
  | (WidgetListFieldBase & {
      popover?: boolean;
      type: "text";
    })
  | (WidgetFormFieldBase & {
      popover?: boolean;
      type: "text";
    })
  | (WidgetListFieldBase & {
      type: "hint" | "input";
    })
  | (WidgetFormFieldBase & {
      type: "hint" | "input";
    })
  | (WidgetListFieldBase & TypeFieldType)
  | (WidgetFormFieldBase & TypeFieldType)
  | (WidgetListFieldBase & {
      assocValueKey?: string;
      associateFieldKey?: string;
      displayedKey?: string;
      popupBcName?: string;
      type: "multivalue" | "multivalueHover";
    })
  | (WidgetFormFieldBase & {
      assocValueKey?: string;
      associateFieldKey?: string;
      displayedKey?: string;
      popupBcName?: string;
      type: "multivalue" | "multivalueHover";
    })
  | (WidgetListFieldBase & {
      pickMap: RecordStringString;
      popupBcName: string;
      type: "pickList";
    })
  | (WidgetFormFieldBase & {
      pickMap: RecordStringString;
      popupBcName: string;
      type: "pickList";
    })
  | (WidgetListFieldBase & {
      pickMap: RecordStringString;
      popupBcName: string;
      searchSpec: string;
      type: "inline-pickList";
    })
  | (WidgetFormFieldBase & {
      pickMap: RecordStringString;
      popupBcName: string;
      searchSpec: string;
      type: "inline-pickList";
    })
  | (WidgetListFieldBase & {
      fileIdKey: string;
      fileSource: string;
      snapshotFileIdKey?: string;
      type: "fileUpload";
    })
  | (WidgetFormFieldBase & {
      fileIdKey: string;
      fileSource: string;
      snapshotFileIdKey?: string;
      type: "fileUpload";
    })
  | (WidgetListFieldBase & {
      type: "hidden";
    })
  | (WidgetFormFieldBase & {
      type: "hidden";
    })
  | (WidgetListFieldBase & {
      type: "radio";
    })
  | (WidgetFormFieldBase & {
      type: "radio";
    })
  | (WidgetFormFieldBase & {
      popups: RecordStringPopup;
      popupBcName: string;
      type: "DMN";
    });
/**
 * Possible types of fields values
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "DataValue".
 */
export type DataValue =
  | MultivalueSingleValue[]
  | (
      | "NULL"
      | "STRING"
      | "INTEGER"
      | "DECIMAL"
      | "DATE"
      | "DATE_TIME"
      | "TIMESTAMP"
      | "BOOLEAN"
      | "NSI"
      | "URI"
      | "LINK"
      | "FILE"
    );
/**
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "WidgetTypes".
 */
export type WidgetTypes =
  | "Legacy"
  | "AssocListPopup"
  | "DataGrid"
  | "DimFilter"
  | "FlatTree"
  | "FlatTreePopup"
  | "Form"
  | "FourthLevelMenu"
  | "HeaderWidget"
  | "Info"
  | "List"
  | "PickListPopup"
  | "PickListPopupForDMN"
  | "Pivot"
  | "SecondLevelMenu"
  | "Text"
  | "ThirdLevelMenu"
  | "WidgetCreator";

/**
 * Модель учёта мастер-сервиса
 */
export interface MasterServiceMeta {
  /**
   * Наименование уёта, например, для отображения в вкладке браузера
   */
  name?: string;
  /**
   * Информация, для отображения в хедере всех страниц сервиса
   */
  header?: string;
  /**
   * Информация, для отображения в футере всех страниц сервиса
   */
  footer?: string;
  /**
   * Сущности учёта
   */
  datamodel?: MetaNode[];
  /**
   * Бизнес-компоненты учёта
   */
  businessComponents?: BusinessComponent[];
  /**
   * Маршруты бизнес-процессов
   */
  routes?: Route[];
  /**
   * Роли пользователей учёта
   */
  roles?: Role[];
  /**
   * Дополнительные атрибуты пользователя для применения фильтрации данных и доступа к экранам, представлениям и виджетам
   */
  userFlexibleAttribute?: UserFlexibleAttribute[];
  /**
   * Меню учёта
   */
  navigation?: {
    menu: (
      | PickViewNavigationGroupTitleHiddenChildDefaultView
      | (PickViewNavigationItemHiddenViewNameScreenName & {
          screenName: string;
          viewName: string;
        })
    )[];
  };
}
/**
 * Node
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "MetaNode".
 */
export interface MetaNode {
  /**
   * Identifier
   */
  id?: number;
  /**
   * Parent identifier
   */
  parentId?: number;
  /**
   * Created at
   */
  createdAt?: string;
  /**
   * Updated at
   */
  updatedAt?: string;
  /**
   * Code
   */
  code?: string;
  /**
   * Name
   */
  name?: string;
  /**
   * Order
   */
  order_?: number;
  /**
   * Блок или поле иои шаблон
   */
  discriminator?: "FIELDD" | "SBLOCK" | "TEMPLATE";
  /**
   * Способ хранения: 'D' (dynamic) — хранится в JSONB поле; 'S' (system) — системный (неизменяемый) атрибут хранится в JSONB поле; 'C' (column) — системный (неизменяемый) атрибут хранится в колонке таблицы;
   */
  storageKind?: "D" | "S" | "C";
  /**
   * Признак того, что узел может хранить несколько значений
   */
  list?: boolean;
  node?: MetaBlock;
  field?: MetaField;
  boSystem?: MetaBoSystem;
}
/**
 * Блок
 */
export interface MetaBlock {
  /**
   * Identifier
   */
  id?: number;
  /**
   * Тип блока ('S' — встраиваемый; 'R' — ссылка на тип)
   */
  type?: "R" | "S";
  /**
   * Meta type id, для вложенных типов. Когда поле уже описаной как тип
   */
  metaTypeId?: number;
  /**
   * Meta type valid from
   */
  metaTypeValidFrom?: string;
  /**
   * Table name
   */
  tableName?: string;
  metaType?: MetaType;
}
/**
 * Для вложенных типов. Когда поле уже описаной как тип
 */
export interface MetaType {
  /**
   * Identifier
   */
  id?: number;
  /**
   * Valid from
   */
  validFrom?: string;
  /**
   * Valid to
   */
  validTo?: string;
  /**
   * Признак корневого типа (объект учёта). Иначе считается встроенным типом
   */
  root?: boolean;
  /**
   * Options JSONB
   */
  options?: string;
}
/**
 * Поле
 */
export interface MetaField {
  /**
   * Identifier
   */
  id?: number;
  /**
   * Type
   */
  type?: string;
  /**
   * Required flag
   */
  required?: boolean;
  /**
   * Default value JSONB
   */
  defaultValue?: string;
  /**
   * Reference code
   */
  referenceCode?: string;
  /**
   * reference type
   */
  referenceType?: string;
}
/**
 * Мнемоника поля/блока/шаблона, определяющая его семантику. Заполняется только для discriminator = TEMPLATE
 */
export interface MetaBoSystem {
  /**
   * Identifier
   */
  metaNodeId?: number;
  /**
   * Мнемоника поля/блока, определяющая его семантику.
   */
  systemId?: string;
}
/**
 * Описание бизнес-компонента
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "BusinessComponent".
 */
export interface BusinessComponent {
  /**
   * If specified this screen will be default screen for the business component; if not, the first available screen will be default screen
   */
  defaultScreen?: string;
  /**
   * Экраны, из которых состоит бизнес-компонент
   */
  primaryScreens?: Screen[];
}
/**
 * Screen
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "Screen".
 */
export interface Screen {
  /**
   * Unique identifier for the screen
   */
  name: string;
  /**
   * Default view for the screen; will be opened if no view name is specified when navigating to a screen
   */
  primaryViewName: string;
  /**
   * Представления, из которых состоит экран
   */
  primaryViews: View[];
  /**
   * Displayed name
   *
   * Required, but not used at the moment; `text` field from `responsibilities` table will be shown instead
   */
  title: string;
  /**
   * Роль, необходимая для работы пользователя с экраном
   */
  roles?: Role[];
}
/**
 * Представление
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "View".
 */
export interface View {
  /**
   * Unique identifier for the view
   */
  name: string;
  /**
   * Displayed name
   */
  title: string;
  /**
   * Url for the view (usually in form of `${screen.name}/${view.name}`)
   */
  url: string;
  /**
   * Widgets present on the view
   */
  widgets: ViewMetaWidgetLegacy | ViewMetaWidget;
}
/**
 * Виджет, сконструированный не в конструкторе, а в запрограммированный вне конструктора
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "ViewMetaWidgetLegacy".
 */
export interface ViewMetaWidgetLegacy {
  /**
   * Ширина сетки
   */
  gridWidth?: number;
  /**
   * Number used to order widget on the view; widgets with lesser `position` will be shown first
   */
  position: number;
  /**
   * Name
   */
  widgetName: string;
  widget?: WidgetLegacy;
}
/**
 * Legacy widget
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "WidgetLegacy".
 */
export interface WidgetLegacy {
  /**
   * Unique identifier for the widget
   */
  id: number;
  /**
   * Url for the operation widget operation
   */
  url: string;
  /**
   * Name of ui widgetComponent
   */
  uiComponentName?: string;
  options?: WidgetOptions;
  showCondition?: WidgetShowCondition;
  /**
   * Displayed name
   */
  title: string;
  /**
   * Widget type
   */
  type:
    | "Legacy"
    | "AssocListPopup"
    | "DataGrid"
    | "DimFilter"
    | "FlatTree"
    | "FlatTreePopup"
    | "Form"
    | "FourthLevelMenu"
    | "HeaderWidget"
    | "Info"
    | "List"
    | "PickListPopup"
    | "PickListPopupForDMN"
    | "Pivot"
    | "SecondLevelMenu"
    | "Text"
    | "ThirdLevelMenu"
    | "WidgetCreator";
}
/**
 * Options specific for differet widget types and also a space to customize your own widget
 */
export interface WidgetOptions {
  actionGroups?: WidgetOperations;
  /**
   * Disable tooltip with error text
   */
  disableHoverError?: boolean;
  /**
   * Disable notification after failed operation
   */
  disableNotification?: boolean;
  /**
   * Record field which value will be used as a title for the whole record
   * for this particular widget
   */
  displayedValueKey?: string;
  hideActionGroups?: string[];
  /**
   * TODO: Move all hierarchy-specific properties to a single property
   */
  hierarchy?: WidgetTableHierarchy[];
  /**
   * Disable searched item descendants in fullHierarchy search
   */
  hierarchyDisableDescendants?: boolean;
  hierarchyDisableParent?: boolean;
  hierarchyDisableRoot?: boolean;
  hierarchyFull?: boolean;
  hierarchyGroupDeselection?: boolean;
  hierarchyGroupSelection?: boolean;
  hierarchyParentKey?: string;
  hierarchyRadio?: boolean;
  hierarchyRadioAll?: boolean;
  hierarchySameBc?: boolean;
  hierarchyTraverse?: boolean;
  layout?: {
    aside?: string[];
    header?: string[];
    rows: LayoutRow[];
  };
  /**
   * Allow selecting multiple items for FlatListPopup
   *
   * TODO: Move to separate interface
   */
  multiple?: boolean;
  /**
   * All widget fields are not editable
   */
  readOnly?: boolean;
  tableOperations?: TableOperations;
}
/**
 * Operations description in `options` of widget meta, which allows its availability.
 */
export interface WidgetOperations {
  /**
   * Default no crud save action
   */
  defaultCrud?: boolean;
  /**
   * List of excluded operations or groups of operations
   */
  exclude?: string[];
  /**
   * List of included operations or groups of operations
   */
  include?: (TypeStringIncludeOperationInclusionDescriptorUndefinedExcludeStringUndefined | string)[];
}
/**
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "{type:string;include?:OperationInclusionDescriptor[]|undefined;exclude?:string[]|undefined;}".
 */
export interface TypeStringIncludeOperationInclusionDescriptorUndefinedExcludeStringUndefined {
  /**
   * List of excluded operations or groups operations
   */
  exclude?: string[];
  /**
   * List of included operations or groups operations
   */
  include?: OperationInclusionDescriptor[];
  /**
   * Type of transaction; a string that uniquely identifies the operation on the widget
   */
  type: string;
  /**
   * Url for the operation (required only for no CRUD and SEARCH operation)
   */
  url?: string;
}
/**
 * Configuration descriptor for hierarchy subset of table widgets.
 *
 * Each descriptor describes a specific level of hierarchy
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "WidgetTableHierarchy".
 */
export interface WidgetTableHierarchy {
  /**
   * What record field to use as displayed value of that record
   */
  assocValueKey?: string;
  /**
   * Which business component is displayed on this level
   */
  bcName: string;
  /**
   * Fields that will be displayed on this hierarchy level
   */
  fields: (
    | (WidgetListFieldBase & {
        digits?: number;
        nullable?: boolean;
        type: "money" | "number" | "percent";
      })
    | (WidgetListFieldBase & {
        type: "date";
      })
    | (WidgetListFieldBase & {
        type: "checkbox";
      })
    | (WidgetListFieldBase & {
        type: "dateTime";
      })
    | (WidgetListFieldBase & {
        type: "dateTimeWithSeconds";
      })
    | (WidgetListFieldBase & {
        dictionaryName?: string;
        multiple?: boolean;
        type: "dictionary";
      })
    | (WidgetListFieldBase & {
        popover?: boolean;
        type: "text";
      })
    | (WidgetListFieldBase & {
        type: "hint" | "input";
      })
    | (WidgetListFieldBase & TypeFieldType)
    | (WidgetListFieldBase & {
        assocValueKey?: string;
        associateFieldKey?: string;
        displayedKey?: string;
        popupBcName?: string;
        type: "multivalue" | "multivalueHover";
      })
    | (WidgetListFieldBase & {
        pickMap: RecordStringString;
        popupBcName: string;
        type: "pickList";
      })
    | (WidgetListFieldBase & {
        pickMap: RecordStringString;
        popupBcName: string;
        searchSpec: string;
        type: "inline-pickList";
      })
    | (WidgetListFieldBase & {
        fileIdKey: string;
        fileSource: string;
        snapshotFileIdKey?: string;
        type: "fileUpload";
      })
    | (WidgetListFieldBase & {
        type: "hidden";
      })
    | (WidgetListFieldBase & {
        type: "radio";
      })
    | (WidgetListFieldBase & {
        popups: RecordStringPopup;
        popupBcName: string;
        type: "DMN";
      })
    | (WidgetFormFieldBase & {
        popups: RecordStringPopup;
        popupBcName: string;
        type: "DMN";
      })
  )[];
  /**
   * If true only one item can be selected
   */
  radio?: boolean;
}
/**
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "WidgetListFieldBase".
 */
export interface WidgetListFieldBase {
  bgColor?: string;
  bgColorKey?: string;
  drillDown?: boolean;
  drillDownKey?: string;
  /**
   * Whether the field is hidden
   */
  hidden?: boolean;
  /**
   * Shift value of different hierarchy level
   */
  hierarchyShift?: boolean;
  /**
   * В этом поле должна быть ссылка на MetaNode.id
   */
  key: string;
  label?: string;
  /**
   * Maximum number of characters
   */
  maxInput?: number;
  snapshotKey?: string;
  title: string;
  type: FieldType;
  width?: number;
}
/**
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "{type:FieldType.multifield;fields:WidgetField[];style:"inline"|"list";}".
 */
export interface TypeFieldType {
  fields: WidgetField[];
  style: "inline" | "list";
  type: "multifield";
}
/**
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "WidgetFormFieldBase".
 */
export interface WidgetFormFieldBase {
  bgColor?: string;
  bgColorKey?: string;
  drillDown?: boolean;
  drillDownKey?: string;
  /**
   * Whether the field is hidden
   */
  hidden?: boolean;
  /**
   * Shift value of different hierarchy level
   */
  hierarchyShift?: boolean;
  /**
   * В этом поле должна быть ссылка на MetaNode.id
   */
  key: string;
  label: string;
  /**
   * Maximum number of characters
   */
  maxInput?: number;
  snapshotKey?: string;
  type: FieldType;
}
/**
 * Construct a type with a set of properties K of type T
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "Record<string,string>".
 */
export interface RecordStringString {}
/**
 * Construct a type with a set of properties K of type T
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "Record<string,Popup>".
 */
export interface RecordStringPopup {}
/**
 * Description of the interface for LayoutRow
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "LayoutRow".
 */
export interface LayoutRow {
  cols: LayoutCol[];
}
/**
 * Description of the interface for WidgetOptions's layout.rows
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "LayoutCol".
 */
export interface LayoutCol {
  fieldKey: string;
  span?: number;
}
/**
 * Options for allowed on table widget actions
 */
export interface TableOperations {
  /**
   * Describes position of tableOperations relatively of table
   */
  position?: "Bottom" | "Top" | "TopAndBottom";
}
/**
 * When specified widget will not be displayed until specific conditions are met
 */
export interface WidgetShowCondition {
  /**
   * Здесь указывается компонент, в зависимости от состояния которого нужно отображать данный widget, в том числе это может быть сам же виджет
   */
  bcName: string;
  isDefault: boolean;
  params: {
    fieldKey: string;
    /**
     * Possible types of fields values
     */
    value?:
      | MultivalueSingleValue[]
      | (
          | "NULL"
          | "STRING"
          | "INTEGER"
          | "DECIMAL"
          | "DATE"
          | "DATE_TIME"
          | "TIMESTAMP"
          | "BOOLEAN"
          | "NSI"
          | "URI"
          | "LINK"
          | "FILE"
        );
  };
}
/**
 * Structure which contain `Multivalue` field's values
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "MultivalueSingleValue".
 */
export interface MultivalueSingleValue {
  /**
   * Record's identificator
   */
  id: string;
  options?: MultivalueSingleValueOptions;
  /**
   * Showed value
   */
  value: string;
}
/**
 * `Multivalue` field's options
 */
export interface MultivalueSingleValueOptions {
  drillDown?: string;
  /**
   * Types of drilldowns in the application, specified by service API
   */
  drillDownType?: "external" | "inner" | "relative";
  /**
   * Hint for value
   */
  hint?: string;
  /**
   * Type of Icon
   */
  icon?: string;
  snapshotState?: "deleted" | "new" | "noChange";
}
/**
 * Виджет, сконструированный в конструкторе
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "ViewMetaWidget".
 */
export interface ViewMetaWidget {
  /**
   * Ширина сетки
   */
  gridWidth?: number;
  /**
   * Number used to order widget on the view; widgets with lesser `position` will be shown first
   */
  position: number;
  /**
   * Name
   */
  widgetName: string;
  widget?: WidgetMeta;
}
/**
 * Widget can be uniquely identified by numeric id
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "WidgetMeta".
 */
export interface WidgetMeta {
  /**
   * В этом поле должна быть ссылка на MetaBoSystem.system_id
   */
  boSystemId: string;
  /**
   * Fields that will be displayed on widget
   */
  fields: (
    | (WidgetListFieldBase & {
        digits?: number;
        nullable?: boolean;
        type: "money" | "number" | "percent";
      })
    | (WidgetFormFieldBase & {
        digits?: number;
        nullable?: boolean;
        type: "money" | "number" | "percent";
      })
    | (WidgetListFieldBase & {
        type: "date";
      })
    | (WidgetFormFieldBase & {
        type: "date";
      })
    | (WidgetListFieldBase & {
        type: "checkbox";
      })
    | (WidgetFormFieldBase & {
        type: "checkbox";
      })
    | (WidgetListFieldBase & {
        type: "dateTime";
      })
    | (WidgetFormFieldBase & {
        type: "dateTime";
      })
    | (WidgetListFieldBase & {
        type: "dateTimeWithSeconds";
      })
    | (WidgetFormFieldBase & {
        type: "dateTimeWithSeconds";
      })
    | (WidgetListFieldBase & {
        dictionaryName?: string;
        multiple?: boolean;
        type: "dictionary";
      })
    | (WidgetFormFieldBase & {
        dictionaryName?: string;
        multiple?: boolean;
        type: "dictionary";
      })
    | (WidgetListFieldBase & {
        popover?: boolean;
        type: "text";
      })
    | (WidgetFormFieldBase & {
        popover?: boolean;
        type: "text";
      })
    | (WidgetListFieldBase & {
        type: "hint" | "input";
      })
    | (WidgetFormFieldBase & {
        type: "hint" | "input";
      })
    | (WidgetListFieldBase & TypeFieldType)
    | (WidgetFormFieldBase & TypeFieldType)
    | (WidgetListFieldBase & {
        assocValueKey?: string;
        associateFieldKey?: string;
        displayedKey?: string;
        popupBcName?: string;
        type: "multivalue" | "multivalueHover";
      })
    | (WidgetFormFieldBase & {
        assocValueKey?: string;
        associateFieldKey?: string;
        displayedKey?: string;
        popupBcName?: string;
        type: "multivalue" | "multivalueHover";
      })
    | (WidgetListFieldBase & {
        pickMap: RecordStringString;
        popupBcName: string;
        type: "pickList";
      })
    | (WidgetFormFieldBase & {
        pickMap: RecordStringString;
        popupBcName: string;
        type: "pickList";
      })
    | (WidgetListFieldBase & {
        pickMap: RecordStringString;
        popupBcName: string;
        searchSpec: string;
        type: "inline-pickList";
      })
    | (WidgetFormFieldBase & {
        pickMap: RecordStringString;
        popupBcName: string;
        searchSpec: string;
        type: "inline-pickList";
      })
    | (WidgetListFieldBase & {
        fileIdKey: string;
        fileSource: string;
        snapshotFileIdKey?: string;
        type: "fileUpload";
      })
    | (WidgetFormFieldBase & {
        fileIdKey: string;
        fileSource: string;
        snapshotFileIdKey?: string;
        type: "fileUpload";
      })
    | (WidgetListFieldBase & {
        type: "hidden";
      })
    | (WidgetFormFieldBase & {
        type: "hidden";
      })
    | (WidgetListFieldBase & {
        type: "radio";
      })
    | (WidgetFormFieldBase & {
        type: "radio";
      })
    | (WidgetFormFieldBase & {
        popups: RecordStringPopup;
        popupBcName: string;
        type: "DMN";
      })
  )[];
  /**
   * Unique identifier for the widget
   */
  id: number;
  /**
   * For list-like widget this option will limit the number of displayed records
   */
  limit?: number;
  options?: WidgetOptions1;
  showCondition?: WidgetShowCondition1;
  /**
   * Displayed name
   */
  title: string;
  /**
   * Widget type
   */
  type:
    | "Legacy"
    | "AssocListPopup"
    | "DataGrid"
    | "DimFilter"
    | "FlatTree"
    | "FlatTreePopup"
    | "Form"
    | "FourthLevelMenu"
    | "HeaderWidget"
    | "Info"
    | "List"
    | "PickListPopup"
    | "PickListPopupForDMN"
    | "Pivot"
    | "SecondLevelMenu"
    | "Text"
    | "ThirdLevelMenu"
    | "WidgetCreator";
}
/**
 * Options specific for differet widget types and also a space to customize your own widget
 */
export interface WidgetOptions1 {
  actionGroups?: WidgetOperations;
  /**
   * Disable tooltip with error text
   */
  disableHoverError?: boolean;
  /**
   * Disable notification after failed operation
   */
  disableNotification?: boolean;
  /**
   * Record field which value will be used as a title for the whole record
   * for this particular widget
   */
  displayedValueKey?: string;
  hideActionGroups?: string[];
  /**
   * TODO: Move all hierarchy-specific properties to a single property
   */
  hierarchy?: WidgetTableHierarchy[];
  /**
   * Disable searched item descendants in fullHierarchy search
   */
  hierarchyDisableDescendants?: boolean;
  hierarchyDisableParent?: boolean;
  hierarchyDisableRoot?: boolean;
  hierarchyFull?: boolean;
  hierarchyGroupDeselection?: boolean;
  hierarchyGroupSelection?: boolean;
  hierarchyParentKey?: string;
  hierarchyRadio?: boolean;
  hierarchyRadioAll?: boolean;
  hierarchySameBc?: boolean;
  hierarchyTraverse?: boolean;
  layout?: {
    aside?: string[];
    header?: string[];
    rows: LayoutRow[];
  };
  /**
   * Allow selecting multiple items for FlatListPopup
   *
   * TODO: Move to separate interface
   */
  multiple?: boolean;
  /**
   * All widget fields are not editable
   */
  readOnly?: boolean;
  tableOperations?: TableOperations;
}
/**
 * When specified widget will not be displayed until specific conditions are met
 */
export interface WidgetShowCondition1 {
  /**
   * Здесь указывается компонент, в зависимости от состояния которого нужно отображать данный widget, в том числе это может быть сам же виджет
   */
  bcName: string;
  isDefault: boolean;
  params: {
    fieldKey: string;
    /**
     * Possible types of fields values
     */
    value?:
      | MultivalueSingleValue[]
      | (
          | "NULL"
          | "STRING"
          | "INTEGER"
          | "DECIMAL"
          | "DATE"
          | "DATE_TIME"
          | "TIMESTAMP"
          | "BOOLEAN"
          | "NSI"
          | "URI"
          | "LINK"
          | "FILE"
        );
  };
}
/**
 * Описание роли пользователя
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "Role".
 */
export interface Role {
  /**
   * Unique identifier of role
   */
  code?: string;
  /**
   * Name of role
   */
  name?: string;
  /**
   * Полномочия внутри роли
   */
  permissions?: (Permission | BasePermission)[];
}
/**
 * Описание полномочия пользователя кастомное
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "Permission".
 */
export interface Permission {
  /**
   * Unique identifier of permission
   */
  code?: string;
  /**
   * Name of permission
   */
  name?: string;
}
/**
 * Описание полномочия пользователя базовое
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "BasePermission".
 */
export interface BasePermission {
  type?: "view" | "viewRestricted" | "viewEditRestricted" | "edit";
  /**
   * Name of permission
   */
  name?: string;
  /**
   * Name of restriction attribute, counfigured for user in current service, requerired for viewRestricted and viewEditRestricted permission types
   */
  restrictions?: UserFlexibleAttribute[];
}
/**
 * Дополнительные атрибуты пользователя. Предполагается хранение данных пользователя в таблице, например user, а json, формируемы по этой схеме хранить в воле 'flexibleAttribute', value будет задаваться в администрировании конкретного учёта
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "UserFlexibleAttribute".
 */
export interface UserFlexibleAttribute {
  /**
   * Unique identifier of attribute
   */
  code?: string;
  /**
   * Name of attribute
   */
  name?: string;
  /**
   * Value
   */
  value?: string;
}
/**
 * Маршрут
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "Route".
 */
export interface Route {
  /**
   * Уникальный идентификатор маршрута
   */
  id?: number;
  /**
   * Код маршрута
   */
  code?: string;
  /**
   * Наименование маршрута
   */
  name?: string;
  /**
   * Признак актуальности. Принимает значения true и null
   */
  active?: boolean;
  /**
   * Вес маршрута. Чем меньше, тем раньше маршрут будет рассмотрен как кандидат
   */
  weight?: number;
  externalSystemCode?: string;
  externalSystemName?: string;
  routeTypeCode?: string;
  routeTypeName?: string;
  /**
   * Актуальная версия
   */
  versionId?: number;
  /**
   * Created at
   */
  createdAt?: string;
  /**
   * Updated at
   */
  updatedAt?: string;
  /**
   * Status
   */
  status?: "DRAFT" | "ACTIVE" | "ARCHIVE";
  /**
   * Параметры запуска маршрута
   */
  conditions?: RouteCondition[];
  /**
   * Версии маршрута маршрута
   */
  versions?: RouteVersion[];
}
/**
 * Параметр запуска маршрута
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "RouteCondition".
 */
export interface RouteCondition {
  /**
   * Идентификатор маршрута
   */
  routeId?: number;
  /**
   * Идентификатор атрибута
   */
  routeTypeAttributeId?: number;
  /**
   * Операция
   */
  operation?: "EQ" | "NE" | "LT" | "GT" | "LE" | "GE" | "IN";
  /**
   * Значение атрибута
   */
  value?: number;
}
/**
 * Версия маршрута
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "RouteVersion".
 */
export interface RouteVersion {
  /**
   * Уникальный идентификатор версии
   */
  id?: number;
  /**
   * Status
   */
  status?: "DRAFT" | "ACTIVE" | "ARCHIVE";
  /**
   * Created at
   */
  createdAt?: string;
  /**
   * Updated at
   */
  updatedAt?: string;
  /**
   * Шаги маршрута
   */
  steps?: RouteStep[];
}
/**
 * Шаг маршрута
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "RouteStep".
 */
export interface RouteStep {
  /**
   * Уникальный идентификатор шага
   */
  id?: number;
  /**
   * Идентификатор версии маршрута
   */
  routeVersionId?: number;
  /**
   * Статус шага. Получается из сторонней системы
   */
  routeStepStateId?: number;
  /**
   * Название шага
   */
  name?: string;
  /**
   * Код шага
   */
  code?: string;
  popupBcName?: string;
  /**
   * Признак начального шага
   */
  start?: boolean;
  /**
   * Признак финального шага. После него процесс останавливается
   */
  end?: boolean;
  /**
   * Признак кнопки куратора
   */
  manualEnabled?: boolean;
  /**
   * Позиция фигуры на диаграмме
   */
  shapeX?: number;
  /**
   * Позиция фигуры на диаграмме
   */
  shapeY?: number;
  /**
   * Размер фигуры на диаграмме
   */
  shapeWidth?: number;
  /**
   * Размер фигуры на диаграмме
   */
  shapeHeight?: number;
  /**
   * Триггеры перехода
   */
  triggers?: Trigger[];
}
/**
 * Триггер перехода
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "Trigger".
 */
export interface Trigger {
  /**
   * Уникальный идентификатор триггера, UUID
   */
  id?: string;
  /**
   * Тип триггера
   */
  type?: "BUTTON" | "TIMER" | "MESSAGE" | "SLA";
  /**
   * Название перехода
   */
  name?: string;
  transition?: RouteTransition;
  targetStepStateCode?: string;
  conclusions?: Conclusion[];
  triggerViewRule?: TriggerViewRule;
  /**
   * Правила валидации
   */
  validationRules?: ValidationRule[];
  /**
   * Дополнительные действия
   */
  additionalActions?: AdditionalAction[];
  /**
   * Субъект управления
   */
  subjectType?: "GROUP" | "USER" | "DYNAMIC";
  /**
   * И/ИЛИ
   */
  criteria?: "AND" | "OR";
  /**
   * Обязательность
   */
  conclusionMandatory?: "MANDATORY" | "OPTIONAL" | "NONE";
  /**
   * Значение
   */
  value?: string;
  /**
   * Идентификатор сообщения (для триггеров по сообщению)
   */
  messageValueId?: number;
  /**
   * Длительность в ISO формате
   */
  duration?: number;
  /**
   * Период исполнения
   */
  executionPeriod?: number;
  /**
   * Период напоминания
   */
  reminderPeriod?: number;
  /**
   * Субьекты
   */
  subjects?: Subject[];
}
/**
 * Переход
 */
export interface RouteTransition {
  /**
   * Уникальный идентификатор, UUID
   */
  id?: string;
  /**
   * Идентификатор шага откуда
   */
  transitionFrom?: string;
  /**
   * Идентификатор шага куда
   */
  transitionTo?: string;
  /**
   * Идентификатор перехода
   */
  triggerId?: string;
  /**
   * Параметры запуска
   */
  condition?: string;
  /**
   * Координаты точек перехода между шагами на диаграмме
   */
  nodes?: RouteTransitionNode[];
}
/**
 * Узел перехода
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "RouteTransitionNode".
 */
export interface RouteTransitionNode {
  transition?: TransitionNodeKey;
  /**
   * Уникальный идентификатор, UUID
   */
  transitionId?: string;
  /**
   * Порядковый номер узла
   */
  index?: number;
  /**
   * Координата X узла
   */
  posX?: number;
  /**
   * Координата Y узла
   */
  posY?: number;
}
/**
 * Идентификатор перехода
 */
export interface TransitionNodeKey {
  /**
   * Идентификатор узла
   */
  routeTransitionId?: number;
  /**
   * Порядковый номер узла
   */
  index?: number;
}
/**
 * Комментарий/заключение
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "Conclusion".
 */
export interface Conclusion {
  /**
   * Уникальный идентификатор, UUID
   */
  id?: string;
  /**
   * Идентификатор перехода
   */
  triggerId?: string;
  /**
   * Текст
   */
  conclusion?: string;
}
/**
 * Правило отображения
 */
export interface TriggerViewRule {
  /**
   * Идентификатор атрибута
   */
  attributeId?: number;
  /**
   * Тип правила
   */
  type?: "EMPTY" | "NOT_EMPTY" | "EQUAL" | "NOT_EQUAL" | "IN";
  /**
   * Значения атрибута
   */
  values?: string[];
}
/**
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "ValidationRule".
 */
export interface ValidationRule {
  /**
   * Уникальный идентификатор, UUID
   */
  id?: string;
  /**
   * Идентификатор атрибута
   */
  attributeId?: number;
  regexp?: string;
}
/**
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "AdditionalAction".
 */
export interface AdditionalAction {
  /**
   * Уникальный идентификатор, UUID
   */
  id?: string;
  /**
   * Тип действия, заложено для развития
   */
  actionName?: "NEW_VERSION";
  /**
   * Приводт к созданию новой версии
   */
  newVersion?: boolean;
}
/**
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "Subject".
 */
export interface Subject {
  /**
   * Идентификатор
   */
  id?: number;
  /**
   * Группа, пользователь или динамически задаваемые участники
   */
  discriminator?: "GROUP" | "USER" | "DYNAMIC";
  /**
   * Все или любой
   */
  criteriaGroup?: "ALL" | "ANY";
  /**
   * Идентификатор
   */
  containerId?: number;
  name?: string;
  /**
   * Created at
   */
  createdAt?: string;
  /**
   * Updated at
   */
  updatedAt?: string;
  /**
   * Deleted at
   */
  deletedAt?: string;
  /**
   * Cached at
   */
  cachedAt?: string;
}
/**
 * From T, pick a set of properties whose keys are in the union K
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "Pick<ViewNavigationGroup,"title"|"hidden"|"child"|"defaultView">".
 */
export interface PickViewNavigationGroupTitleHiddenChildDefaultView {
  /**
   * Nested items for the group
   */
  child: (ViewNavigationGroup | ViewNavigationItem)[];
  /**
   * If specified this view will be default view for the group; if not, the first available view will be default view
   */
  defaultView?: string;
  /**
   * If true, the group will not be visible in navigation (but still accessible by direct link or drilldown)
   */
  hidden?: boolean;
  /**
   * Displayed name for the grouup
   */
  title: string;
}
/**
 * Description of groups in the navigation menu.
 *
 * Used to create nesting levels of menu items.
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "ViewNavigationGroup".
 */
export interface ViewNavigationGroup {
  /**
   * Nested items for the group
   */
  child: (ViewNavigationGroup | ViewNavigationItem)[];
  /**
   * If specified this view will be default view for the group; if not, the first available view will be default view
   */
  defaultView?: string;
  /**
   * If true, the group will not be visible in navigation (but still accessible by direct link or drilldown)
   */
  hidden?: boolean;
  id?: string | number;
  /**
   * Displayed name for the grouup
   */
  title: string;
}
/**
 * Description of the destination in the navigation menu
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "ViewNavigationItem".
 */
export interface ViewNavigationItem {
  hidden?: boolean;
  id?: string;
  screenName?: string;
  viewName?: string;
}
/**
 * From T, pick a set of properties whose keys are in the union K
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "Pick<ViewNavigationItem,"hidden"|"viewName"|"screenName">".
 */
export interface PickViewNavigationItemHiddenViewNameScreenName {
  hidden?: boolean;
  screenName?: string;
  viewName?: string;
}
/**
 * Description of options of allowed on table widget actions
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "TableOperations".
 */
export interface TableOperations1 {
  /**
   * Describes position of tableOperations relatively of table
   */
  position?: "Bottom" | "Top" | "TopAndBottom";
}
/**
 * `Multivalue` field's options
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "MultivalueSingleValueOptions".
 */
export interface MultivalueSingleValueOptions1 {
  drillDown?: string;
  /**
   * Types of drilldowns in the application, specified by service API
   */
  drillDownType?: "external" | "inner" | "relative";
  /**
   * Hint for value
   */
  hint?: string;
  /**
   * Type of Icon
   */
  icon?: string;
  snapshotState?: "deleted" | "new" | "noChange";
}
/**
 * Operations description in `options` of widget meta, which allows its availability.
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "WidgetOperations".
 */
export interface WidgetOperations1 {
  /**
   * Default no crud save action
   */
  defaultCrud?: boolean;
  /**
   * List of excluded operations or groups of operations
   */
  exclude?: string[];
  /**
   * List of included operations or groups of operations
   */
  include?: (TypeStringIncludeOperationInclusionDescriptorUndefinedExcludeStringUndefined | string)[];
}
/**
 * Popups
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "Popup".
 */
export interface Popup {
  pickMap: RecordStringString;
  popupBcName: string;
  type: "pickList";
}
/**
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "WidgetOptions".
 */
export interface WidgetOptions2 {
  actionGroups?: WidgetOperations;
  /**
   * Disable tooltip with error text
   */
  disableHoverError?: boolean;
  /**
   * Disable notification after failed operation
   */
  disableNotification?: boolean;
  /**
   * Record field which value will be used as a title for the whole record
   * for this particular widget
   */
  displayedValueKey?: string;
  hideActionGroups?: string[];
  /**
   * TODO: Move all hierarchy-specific properties to a single property
   */
  hierarchy?: WidgetTableHierarchy[];
  /**
   * Disable searched item descendants in fullHierarchy search
   */
  hierarchyDisableDescendants?: boolean;
  hierarchyDisableParent?: boolean;
  hierarchyDisableRoot?: boolean;
  hierarchyFull?: boolean;
  hierarchyGroupDeselection?: boolean;
  hierarchyGroupSelection?: boolean;
  hierarchyParentKey?: string;
  hierarchyRadio?: boolean;
  hierarchyRadioAll?: boolean;
  hierarchySameBc?: boolean;
  hierarchyTraverse?: boolean;
  layout?: {
    aside?: string[];
    header?: string[];
    rows: LayoutRow[];
  };
  /**
   * Allow selecting multiple items for FlatListPopup
   *
   * TODO: Move to separate interface
   */
  multiple?: boolean;
  /**
   * All widget fields are not editable
   */
  readOnly?: boolean;
  tableOperations?: TableOperations;
}
/**
 * Show widget only if certain condition is met
 *
 * Supported conditions:
 * - Active record for specified business component {bcName} should contain field {fieldKey}
 * with value {fieldValue}
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "WidgetShowCondition".
 */
export interface WidgetShowCondition2 {
  /**
   * Здесь указывается компонент, в зависимости от состояния которого нужно отображать данный widget, в том числе это может быть сам же виджет
   */
  bcName: string;
  isDefault: boolean;
  params: {
    fieldKey: string;
    /**
     * Possible types of fields values
     */
    value?:
      | MultivalueSingleValue[]
      | (
          | "NULL"
          | "STRING"
          | "INTEGER"
          | "DECIMAL"
          | "DATE"
          | "DATE_TIME"
          | "TIMESTAMP"
          | "BOOLEAN"
          | "NSI"
          | "URI"
          | "LINK"
          | "FILE"
        );
  };
}
/**
 * Field
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "MetaField".
 */
export interface MetaField1 {
  /**
   * Identifier
   */
  id?: number;
  /**
   * Type
   */
  type?: string;
  /**
   * Required flag
   */
  required?: boolean;
  /**
   * Default value JSONB
   */
  defaultValue?: string;
  /**
   * Reference code
   */
  referenceCode?: string;
  /**
   * reference type
   */
  referenceType?: string;
}
/**
 * Block
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "MetaBlock".
 */
export interface MetaBlock1 {
  /**
   * Identifier
   */
  id?: number;
  /**
   * Тип блока ('S' — встраиваемый; 'R' — ссылка на тип)
   */
  type?: "R" | "S";
  /**
   * Meta type id, для вложенных типов. Когда поле уже описаной как тип
   */
  metaTypeId?: number;
  /**
   * Meta type valid from
   */
  metaTypeValidFrom?: string;
  /**
   * Table name
   */
  tableName?: string;
  metaType?: MetaType;
}
/**
 * Type
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "MetaType".
 */
export interface MetaType1 {
  /**
   * Identifier
   */
  id?: number;
  /**
   * Valid from
   */
  validFrom?: string;
  /**
   * Valid to
   */
  validTo?: string;
  /**
   * Признак корневого типа (объект учёта). Иначе считается встроенным типом
   */
  root?: boolean;
  /**
   * Options JSONB
   */
  options?: string;
}
/**
 * Bo system
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "MetaBoSystem".
 */
export interface MetaBoSystem1 {
  /**
   * Identifier
   */
  metaNodeId?: number;
  /**
   * Мнемоника поля/блока, определяющая его семантику.
   */
  systemId?: string;
}
/**
 * Правило отображения
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "TriggerViewRule".
 */
export interface TriggerViewRule1 {
  /**
   * Идентификатор атрибута
   */
  attributeId?: number;
  /**
   * Тип правила
   */
  type?: "EMPTY" | "NOT_EMPTY" | "EQUAL" | "NOT_EQUAL" | "IN";
  /**
   * Значения атрибута
   */
  values?: string[];
}
/**
 * Переход
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "RouteTransition".
 */
export interface RouteTransition1 {
  /**
   * Уникальный идентификатор, UUID
   */
  id?: string;
  /**
   * Идентификатор шага откуда
   */
  transitionFrom?: string;
  /**
   * Идентификатор шага куда
   */
  transitionTo?: string;
  /**
   * Идентификатор перехода
   */
  triggerId?: string;
  /**
   * Параметры запуска
   */
  condition?: string;
  /**
   * Координаты точек перехода между шагами на диаграмме
   */
  nodes?: RouteTransitionNode[];
}
/**
 * Ключ узла
 *
 * This interface was referenced by `MasterServiceMeta`'s JSON-Schema
 * via the `definition` "TransitionNodeKey".
 */
export interface TransitionNodeKey1 {
  /**
   * Идентификатор узла
   */
  routeTransitionId?: number;
  /**
   * Порядковый номер узла
   */
  index?: number;
}
