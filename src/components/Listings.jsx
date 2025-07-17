import React, {Children} from "react";

const Listings = (props) => {
 const { items, children, childProps } = props;
 const child = Children.only(children);


 return (
     <div className="listings-container">
       <div className="listing-greed">
        {items.length > 0 ?(
            items.map((item, index) => (
                   React.cloneElement(child, {
                    [childProps]: item,
                    key: item.id ?? index
                   })
               )
            )
        ):(
         <p>Nothing to display</p>
        )

        }
       </div>
     </div>
 );
};

export default Listings;