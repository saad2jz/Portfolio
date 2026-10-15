import React, {type ReactNode} from 'react';

// The scroll controller enhances this existing structure. It never reparents
// hydrated headings, their links or Framer-managed children.
export function ChapterIntro({children,className}:{children:ReactNode;className:string}) {
 return <div className="chapter-track"><div className={className+' chapter-stage'}>{children}</div></div>;
}
