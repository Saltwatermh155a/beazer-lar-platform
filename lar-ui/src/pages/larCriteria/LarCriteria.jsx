import Header from '../../components/Header'

const LarCriteria = () => {
    return (
        <>
            <Header title="LAR CRITERIA" deal_name_dropdown={true} header_visibility={true} />
            <div className='container'>
                <table className="table table-bordered my-3">
                    <thead className='text-center'>
                        <tr>
                            <th>#</th>
                            <th>Criteria</th>
                            <th>This Deal</th>
                            <th>Override</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>{`Each Product Line < 150 Homes`}</td>
                            <td><span className="ms-2">120 homes</span></td>
                            <td><input type="number" className="form-control" defaultValue={0} disabled /></td>
                            <td><button className="btn btn-success w-100" disabled>PASS</button></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>{`ASP < FY ASP`}</td>
                            <td><span className="ms-2">Y</span></td>
                            <td><select className="form-select" disabled><option value="">—</option></select></td>
                            <td><button className="btn btn-success w-100" disabled>PASS</button></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Community Active Within 18 Months</td>
                            <td><select className="form-select" disabled><option value="Y">Y</option></select></td>
                            <td></td>
                            <td><button className="btn btn-success w-100" disabled>PASS</button></td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Triangle of Potential Output is Low or Very Low</td>
                            <td><span className="ms-2">Low Risk</span></td>
                            <td><select className="form-select" disabled><option value="">—</option></select></td>
                            <td><button className="btn btn-success w-100" disabled>PASS</button></td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Existing Product</td>
                            <td><select className="form-select" disabled><option value="Y">Y</option></select></td>
                            <td></td>
                            <td><button className="btn btn-success w-100" disabled>PASS</button></td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Existing Submarket</td>
                            <td><select className="form-select" disabled><option value="Y">Y</option></select></td>
                            <td></td>
                            <td><button className="btn btn-success w-100" disabled>PASS</button></td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>55+</td>
                            <td><select className="form-select" disabled><option value="N">N</option></select></td>
                            <td></td>
                            <td><button className="btn btn-danger w-100" disabled>NO PASS</button></td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>Rolling Option</td>
                            <td><select className="form-select" disabled><option value="No-Bulk">No-Bulk</option></select></td>
                            <td></td>
                            <td><button className="btn btn-danger w-100" disabled>NO PASS</button></td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>{`Total Land Acq Spend ≤ $10 Million`}</td>
                            <td><span className="ms-2">$8,200,000</span></td>
                            <td><input type="text" className="form-control" defaultValue="$0" disabled /></td>
                            <td><button className="btn btn-success w-100" disabled>PASS</button></td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>{`Total Land Dev Spend ≤ $10 Million`}</td>
                            <td><span className="ms-2">$6,800,000</span></td>
                            <td><input type="text" className="form-control" defaultValue="$0" disabled /></td>
                            <td><button className="btn btn-success w-100" disabled>PASS</button></td>
                        </tr>
                        <tr>
                            <td colSpan="4">Number of Criteria Met:</td>
                            <td className="text-center"><span>8</span></td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-center">
                    <button className="btn btn-info mb-3 text-white" disabled>Save LAR criteria</button>
                </div>
            </div>
        </>
    )
}

export default LarCriteria
