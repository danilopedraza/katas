use std::fmt::{self, Display};
pub struct Item {
    pub name: String,
    pub sell_in: i32,
    pub quality: i32,
}

impl Item {
    pub fn new(name: impl Into<String>, sell_in: i32, quality: i32) -> Item {
        Item {
            name: name.into(),
            sell_in,
            quality,
        }
    }
}

impl Display for Item {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}, {}, {}", self.name, self.sell_in, self.quality)
    }
}

pub struct GildedRose {
    pub items: Vec<Item>,
}

impl GildedRose {
    pub fn new(items: Vec<Item>) -> GildedRose {
        GildedRose { items }
    }

    fn update_item_sell_in(item: &mut Item) {
        if item.name != "Sulfuras, Hand of Ragnaros" {
            item.sell_in = item.sell_in - 1;
        }
    }

    fn update_item_quality(item: &mut Item) {
        if item.name == "Backstage passes to a TAFKAL80ETC concert" {
            if 0 <= item.sell_in && item.sell_in <= 5 {
                item.quality += 3;
            } else if 6 <= item.sell_in && item.sell_in <= 10 {
                item.quality += 2;
            } else {
                item.quality += 1;
            }
        } else if item.name == "Aged Brie" {
            item.quality = item.quality + 1;
        } else {
            item.quality = item.quality - 1;
        }

        if item.quality > 50 {
            item.quality = 50;
        }
        
        if item.quality < 0 {
            item.quality = 0;
        }
    }

    fn update_item(item: &mut Item) {
            if item.name == "Sulfuras, Hand of Ragnaros" {
                return;
            }

            Self::update_item_quality(item);
        

            Self::update_item_sell_in(item);

            if item.sell_in < 0 {
                if item.name != "Aged Brie" {
                    if item.name != "Backstage passes to a TAFKAL80ETC concert" {
                        if item.quality > 0 {
                                item.quality = item.quality - 1;
                        }
                    } else {
                        item.quality = 0;
                    }
                } else {
                    if item.quality < 50 {
                        item.quality = item.quality + 1;
                    }
                }
            }
    }

    pub fn update_quality(&mut self) {
        for item in &mut self.items {
            Self::update_item(item);
        }
    }
}

#[cfg(test)]
mod tests {
    use super::{GildedRose, Item};

    #[test]
    pub fn foo() {
        let items = vec![Item::new("foo", 0, 0)];
        let mut rose = GildedRose::new(items);
        rose.update_quality();

        assert_eq!("foo", rose.items[0].name);
    }
}
