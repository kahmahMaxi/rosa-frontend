









const InModules = ({showmodule, modulevalue}) => {


    const modulecontent = {
        anxiety: {
            title: 'Anxiety Management',
            content: 'Your anxiety score is just below average based on your activities in the past few days ... Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, itaque dolor velit nihil laborum sed labore totam? Reiciendis sed, a quo quasi ipsum adipisci doloremque eos totam voluptates asperiores nisi.',
            rmd: [ 'Mindfullness', 'Mindfullness', 'Mindfullness' ]
        },
        depression: {
            title: 'Depression Support',
            content: 'Your depression needs some attention ... Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, itaque dolor velit nihil laborum sed labore totam? Reiciendis sed, a quo quasi ipsum adipisci doloremque eos totam voluptates asperiores nisi.',
            rmd: [ 'Mindfullness', 'Mindfullness', 'Mindfullness' ]
        },
        stress: {
            title: 'Stress Reduction',
            content: 'you have been doing pretty well in handling stress good job ... Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, itaque dolor velit nihil laborum sed labore totam? Reiciendis sed, a quo quasi ipsum adipisci doloremque eos totam voluptates asperiores nisi.',
            rmd: [ 'Mindfullness', 'Mindfullness', 'Mindfullness' ]
        },
        selfcare: {
            title: 'Self-Care Toolkit',
            content: 'you are slightly above average in self care looking good ... Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, itaque dolor velit nihil laborum sed labore totam? Reiciendis sed, a quo quasi ipsum adipisci doloremque eos totam voluptates asperiores nisi.',
            rmd: [ 'Mindfullness', 'Mindfullness', 'Mindfullness' ]
        },
    }



    return (
        <div className={`inmodule-container ${showmodule ? 'active' : ''}`}>

            <div className="inmodule-inner">

                <h2 className="inter">
                    {
                        modulevalue === 'anxiety' ? modulecontent.anxiety.title : modulevalue === 'depression' ? modulecontent.depression.title : modulevalue === 'stress' ? modulecontent.stress.title
                        : modulecontent.selfcare.title
                    }
                </h2>
                <h3 className="inter">
                    {
                         modulevalue === 'anxiety' ? modulecontent.anxiety.content : modulevalue === 'depression' ? modulecontent.depression.content : modulevalue === 'stress' ? modulecontent.stress.content
                         : modulecontent.selfcare.content
                    }
                </h3> <br /><br />
                <h3 className="inter">Below are some reccommendations</h3><br />
                <div className="flex row gap-10">
                    <p className="inter">Mindfullness</p>
                    <p className="inter">Mindfullness</p>
                    <p className="inter">Mindfullness</p>
                </div>
                <div className="inm-btn flex row justify-center align-center cursor-pointer">
                    <h5>Get support instead</h5>
                </div>


            </div>

        </div>
    )


}


export default InModules;

