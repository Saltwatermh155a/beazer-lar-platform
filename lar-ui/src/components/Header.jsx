const Header = (props) => {
    return (
        <>
            {props?.header_visibility && <div className="text-white">
                <div className="row bg-dark">
                    <div className='col-sm-12 col-md-6 col-lg-4'>
                        {props?.deal_name_dropdown && <select
                            className="form-control dropdown-toggle form-select w-75 my-2 ms-2"
                            name='dealName'
                            defaultValue=""
                        >
                            <option value="">Select Deal</option>
                            <option value="1">Sample Deal - Austin TX</option>
                            <option value="2">Sample Deal - Phoenix AZ</option>
                            <option value="3">Sample Deal - Raleigh NC</option>
                        </select>}
                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-8 text-end'>
                    </div>
                </div>
            </div>}
            <div className="bg-gradient text-center p-2 bg-success text-white" style={{ backgroundColor: "#78BE20", height: "45px" }}>
                <h5>{props?.title}</h5>
            </div>
        </>
    )
}

export default Header
