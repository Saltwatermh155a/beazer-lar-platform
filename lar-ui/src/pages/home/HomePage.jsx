import Header from '../../components/Header'

const HomePage = () => {
    return (
        <>
            <Header title="HOME AND DEAL LIST" header_visibility={true} deal_name_dropdown={false} />
            <div className="row container-fluid mb-2">
                <div className="col-sm-12 col-md-7">
                    <div className="row my-2">
                        <label htmlFor="Division" className="col-sm-2 col-form-label">
                            <b>Division:</b>
                        </label>
                        <div className="col-sm-10">
                            <select id="Division" className="form-control form-select" name='division' disabled>
                                <option value="">Select division</option>
                                <option value="Austin TX">Austin TX</option>
                                <option value="Phoenix AZ">Phoenix AZ</option>
                                <option value="Raleigh NC">Raleigh NC</option>
                            </select>
                        </div>
                    </div>
                    {/* Map placeholder */}
                    <div className="map-placeholder">
                        🗺️ Resiliency Map View
                    </div>
                </div>
                <div className="col-sm-12 col-md-5">
                    <div className="my-3 ms-2">
                        <div className="form-check form-check-inline">
                            <input type="radio" id="address" name="radioOptions" value="address" defaultChecked className="form-check-input" disabled />
                            <label htmlFor="address" className="form-check-label">Address / ZipCode</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio" id="coordinates" name="radioOptions" value="coordinates" className="form-check-input" disabled />
                            <label htmlFor="coordinates" className="form-check-label">Coordinates</label>
                        </div>
                    </div>
                    <div className="ms-2">
                        <input type="text" className="form-control mb-2" placeholder="Search address or zip code..." disabled />
                        <button className="btn btn-info text-white" disabled>Search</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage
