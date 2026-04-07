import Header from '../../components/Header'

const TopInputForm = () => {
    return (
        <>
            <Header title="INPUT FORM" deal_name_dropdown={true} header_visibility={true} />
            <div className='container-fluid'>
                <form>
                    <h5 className='my-3'>COMMUNITY INFORMATION</h5>
                    <div className='row'>
                        <div className="mb-3 col-lg-4">
                            <div className='row'>
                                <label className="col-sm-3 col-lg-5"><span>Division</span></label>
                                <div className="col-sm-9 col-lg-7">
                                    <select className="form-control dropdown-toggle form-select" disabled>
                                        <option value="">Select division</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3 col-lg-4">
                            <div className='row'>
                                <label className="col-sm-3 col-lg-5">#Homes</label>
                                <div className="col-sm-9 col-lg-7">
                                    <input type="number" className="form-control" value="0" disabled />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3 col-lg-4">
                            <div className='row'>
                                <label className="col-sm-3 col-lg-5">Product Type</label>
                                <div className="col-sm-9 col-lg-7">
                                    <select className="form-select" disabled>
                                        <option value="">Select product type</option>
                                        <option>SFD</option>
                                        <option>SFA</option>
                                        <option>Condo</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h5 className='my-3'>LAND INFORMATION</h5>
                    <table className="table table-bordered">
                        <thead className='text-center'>
                            <tr>
                                <th className='bg-secondary text-white'>Item</th>
                                <th className='bg-secondary text-white'>Per Lot</th>
                                <th className='bg-secondary text-white'>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Land Acquisition</td><td className='text-center'>$0</td><td className='text-center'>$0</td></tr>
                            <tr><td>Land Development</td><td className='text-center'>$0</td><td className='text-center'>$0</td></tr>
                            <tr><td><b>Total Land Cost</b></td><td className='text-center'><b>$0</b></td><td className='text-center'><b>$0</b></td></tr>
                        </tbody>
                    </table>

                    <h5 className='my-3'>PRICING</h5>
                    <table className="table table-bordered">
                        <thead className='text-center'>
                            <tr>
                                <th className='bg-secondary text-white'>Component</th>
                                <th className='bg-secondary text-white'>ASP</th>
                                <th className='bg-secondary text-white'>Min SP</th>
                                <th className='bg-secondary text-white'>Max SP</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Base Price</td><td className='text-center'>$0</td><td className='text-center'>$0</td><td className='text-center'>$0</td></tr>
                            <tr><td>Lot Premium</td><td className='text-center'>$0</td><td className='text-center'>$0</td><td className='text-center'>$0</td></tr>
                            <tr><td>Structural Options</td><td className='text-center'>$0</td><td className='text-center'>$0</td><td className='text-center'>$0</td></tr>
                            <tr><td>Design Studio</td><td className='text-center'>$0</td><td className='text-center'>$0</td><td className='text-center'>$0</td></tr>
                            <tr><td>Discount</td><td className='text-center'>$0</td><td className='text-center'>$0</td><td className='text-center'>$0</td></tr>
                            <tr><td><b>Estimated Total</b></td><td className='text-center'><b>$0</b></td><td className='text-center'><b>$0</b></td><td className='text-center'><b>$0</b></td></tr>
                        </tbody>
                    </table>

                    <div className="text-center my-3">
                        <button className="btn btn-info me-2 text-white" disabled>Save</button>
                        <button className="btn btn-success text-white" disabled>Calculate TOP</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default TopInputForm
