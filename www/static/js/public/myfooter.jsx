var Myfooter = React.createClass({

    render: function () {

        return (
            <div style={{position : 'relative', bottom: '12px', left: '0', width: "100%", marginTop: "40px"}} className="toBottom">
                <div className=" myfooter container">
                    <div className="row">
                        <div className="col-md-offset-4 col-md-6" style={{color: "white", marginBottom: "5px", marginTop: "5px"}}>Tomoz. © 2018</div>
                    </div>
                </div>
            </div>
        )
    }
})