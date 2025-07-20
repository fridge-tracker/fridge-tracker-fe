import React, {Children} from "react";

const Listings = (props) => {
 const { items, children, childProps, rerender } = props;
 const child = Children.only(children);


 return (
     <div className="listings-container">
        {items?.length > 0 ?(
            items.map((item, index) => (
                   React.cloneElement(child, {
                    [childProps]: item,
                    rerender: rerender,
                    key: item.id ?? index
                   })
               )
            )
        ):(
         <p>Nothing to display</p>
        )

        }
     </div>
 );
};

export default Listings;