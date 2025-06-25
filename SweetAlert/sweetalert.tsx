import SweetAlert from "react-bootstrap-sweetalert";
function SweetAlertComponent({ confirm, cancel, title, subtitle, type }: {
  confirm: any;
  cancel: any;
  title: string;
  subtitle: string;
  type: any;
}): React.JSX.Element {
  return (
    <SweetAlert
      style={{ zIndex: "1" }}
      title={title}
      onConfirm={confirm}
      // type="danger"
      type={type !== undefined ? type : "danger"}
      showCancel={true}
      confirmBtnStyle={{ backgroundColor: "#E6B9A6" }}
      onCancel={cancel}
    >
      <h5> {subtitle} </h5>
    </SweetAlert>
  );
}

export default SweetAlertComponent;