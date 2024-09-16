export interface IButtonConfig {
  text?: string; // button optional text
  icon?: string;   // button optional icon
  styleClass?: string;  // button optional style class
  width?: string; //button optional width
  disabled?: boolean;   // button optional disabled parameter
  tooltip?: string; // button optional tooltip
  type?: string; // button optional type
  action?: () => void;  // optional action triggered after clicking the button
}
