function getElementWithCss({ tag, content }) {

    if(content.trim() == ""){
       return ( <div className="mb-8" ></div>)
    } else if (tag == 'li') {
        return (
            <ul className="list-disc pl-4 text-sm md:text-base">
                <li>{content}</li>
            </ul>
        )
    } else if (tag == 'h6') {
        return <h6 className="text-base dark:text-zinc-300 mb-2 mt-1">{content}</h6>
    } else  if (tag == 'h5') {
        return <h5 className="text-lg dark:text-zinc-300 mb-2 mt-1">{content}</h5>
    } else if (tag == 'h4') {
        return <h4 className="text-xl dark:text-zinc-300 mb-2 mt-1">{content}</h4>
    } else if (tag == 'h3') {
        return <h3 className="text-2xl dark:text-zinc-300 mb-2 mt-1">{content}</h3>
    } else if (tag == 'h2') {
        return <h2 className="text-3xl dark:text-zinc-300 mb-2 mt-1">{content}</h2>
    } else if (tag == 'h1') {
        return <h1 className="text-4xl dark:text-zinc-300 mb-2 mt-1">{content}</h1>
    } else {
        return <p className="text-sm md:text-base mb-2 mt-1">{content}</p>
    }



}

function getDropDownElementWithCss({ tag, content }) {

    if(content.trim() == ""){
       return ( <div className="mb-8" ></div>)
    } else if (tag == 'li') {
        return (
            <ul className="list-disc pl-4 text-sm md:text-base">
                <li>{content}</li>
            </ul>
        )
    } else if (tag == 'h6' || tag == 'h5' ||tag == 'h3'||tag == 'h4'||tag == 'h2'||tag == 'h1' ) {
        return <h6 className="text-base dark:text-zinc-300 mb-2 mt-1">{content}</h6>
    } else {
        return <p className="text-sm md:text-base mb-2 mt-1">{content}</p>
    }
}


export { getElementWithCss ,getDropDownElementWithCss };