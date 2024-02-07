// sats have mailBox for each.
// base sends message, and sats get message.

#[derive(Debug)]
struct CubeSat {
    id: u64,
    messages: Vec<String>,
}

impl CubeSat {
    pub fn recv(&mut self) {
        println!(" {}", self.messages[0]);
        if !self.messages.is_empty() {
            self.messages.remove(0);
        }
    }
}

#[derive(Debug)]
enum StatusMessage {
    Ok,
}

#[derive(Debug)]
struct Base<'a> {
    sats: Vec<&'a mut CubeSat>,
}

impl<'a> Base<'a> {
    fn send(&mut self, message: String) {
        for sat in self.sats.iter_mut() {
            sat.messages.push(message.clone());
        }
    }
}

fn check_status(sat: &CubeSat) {
    println!("{}", sat.id)
}

fn main() {
    let mut base = Base { sats: vec![] };
    let mut sat_a = CubeSat {
        id: 1,
        messages: vec![],
    };
    let mut sat_b = CubeSat {
        id: 2,
        messages: vec![],
    };
    let mut sat_c = CubeSat {
        id: 3,
        messages: vec![],
    };
    base.sats.push(&mut sat_a);
    base.sats.push(&mut sat_b);
    base.sats.push(&mut sat_c);

    base.send(String::from("Hi this is my first message!"));
    for sat in base.sats.iter() {
        println!("{:?}", sat);
    }

    sat_a.recv();
    sat_b.recv();
    sat_c.recv();
    for sat in base.sats.iter() {
        println!("{:?}", sat);
    }
    check_status(&sat_a);
    check_status(&sat_b);
    check_status(&sat_c);

    check_status(&sat_a);
    check_status(&sat_b);
    check_status(&sat_c);
}
