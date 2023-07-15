INSERT INTO sobolev_m_a.roles(name) VALUES('ROLE_USER');
INSERT INTO sobolev_m_a.roles(name) VALUES('ROLE_ADMIN');

insert into sobolev_m_a.statuses (name)
values ('IN_PROGRESS');
insert into sobolev_m_a.statuses (name)
values ('ON_HOLD');
insert into sobolev_m_a.statuses (name)
values ('COMPLETED');

insert into sobolev_m_a.regularities (name)
values ('ONCE');
insert into sobolev_m_a.regularities (name)
values ('DAILY');
insert into sobolev_m_a.regularities (name)
values ('WEEKLY');
insert into sobolev_m_a.regularities (name)
values ('MONTHLY');
insert into sobolev_m_a.regularities (name)
values ('ANNUALLY');

insert into sobolev_m_a.priorities (name)
values ('LOW');
insert into sobolev_m_a.priorities (name)
values ('MEDIUM');
insert into sobolev_m_a.priorities (name)
values ('HIGH');