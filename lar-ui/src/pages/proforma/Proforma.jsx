import Header from '../../components/Header'

const Proforma = () => {
    return (
        <div>
            <Header title="PRELIMINARY PROFORMA" deal_name_dropdown={true} header_visibility={true} />
            <div className="container-fluid my-2">
                <h6>Total project land acquisition: $ 8,200,000</h6>
                <h6>Total project land development: $ 6,800,000</h6>

                <div className="container-fluid mt-4">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <br /><br /><br /><br /><br />
                            <div className="mt-1">Monthly sales pace</div>
                            <div className="mt-2 pt-1">#Homes</div>
                            <div className="mt-2 pt-1">Base Price (per home)</div>
                            <div className="mt-2 pt-1">Net – Incentives and Premiums (per home)</div>
                            <div className="mt-2 pt-1">Adjustment – Base DJOB (per home)</div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <div className="mb-3">
                                <label className="me-2">Division A</label>
                                <select className="w-50" disabled><option>-- Select Division --</option></select>
                            </div>
                            <label className="me-2">Community A</label>
                            <select className="w-50" disabled><option>-- Select --</option></select>
                            <br /><br />
                            <div>
                                <input type="text" placeholder="Monthly sales pace" className="d-block w-75" defaultValue="4.00" disabled />
                                <input type="number" placeholder="#Homes" className="d-block mt-2 w-75" defaultValue="150" disabled />
                                <input type="text" className="d-block mt-2 w-75" defaultValue="$350,000" disabled />
                                <input type="text" className="d-block mt-2 w-75" defaultValue="$35,000" disabled />
                                <input type="text" className="d-block mt-2 w-75" defaultValue="$0" disabled />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <div className="mb-3">
                                <label className="me-2">Division B</label>
                                <select className="w-50" disabled><option>-- Select Division --</option></select>
                            </div>
                            <label className="me-2">Community B</label>
                            <select className="w-50" disabled><option>-- Select --</option></select>
                            <br /><br />
                            <div>
                                <input type="text" placeholder="Monthly sales pace" className="d-block w-75" defaultValue="0" disabled />
                                <input type="number" placeholder="#Homes" className="d-block mt-2 w-75" defaultValue="0" disabled />
                                <input type="text" className="d-block mt-2 w-75" defaultValue="$0" disabled />
                                <input type="text" className="d-block mt-2 w-75" defaultValue="$0" disabled />
                                <input type="text" className="d-block mt-2 w-75" defaultValue="$0" disabled />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <div className="mb-3">
                                <label className="me-2">Division C</label>
                                <select className="w-50" disabled><option>-- Select Division --</option></select>
                            </div>
                            <label className="me-2">Community C</label>
                            <select className="w-50" disabled><option>-- Select --</option></select>
                            <br /><br />
                            <div>
                                <input type="text" placeholder="Monthly sales pace" className="d-block w-75" defaultValue="0" disabled />
                                <input type="number" placeholder="#Homes" className="d-block mt-2 w-75" defaultValue="0" disabled />
                                <input type="text" className="d-block mt-2 w-75" defaultValue="$0" disabled />
                                <input type="text" className="d-block mt-2 w-75" defaultValue="$0" disabled />
                                <input type="text" className="d-block mt-2 w-75" defaultValue="$0" disabled />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-4">
                    <button className="btn btn-info text-white me-2" disabled>Calculate Proforma</button>
                    <button className="btn btn-success text-white" disabled>Save</button>
                </div>
            </div>
        </div>
    )
}

export default Proforma
